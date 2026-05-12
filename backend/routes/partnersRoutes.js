const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Partner = require("../models/Partners");
const { loginPartner } = require("../controllers/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// ========================
// 🔐 AUTH MIDDLEWARE
// ========================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.partnerId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ========================
// CREATE
// ========================
router.post("/", upload.single("logoFile"), async (req, res) => {
  try {
    console.log("🔥 BODY RECEIVED:", req.body);

    const { password, ...rest } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new Partner({
      ...rest,
      password: hashedPassword,
      logoFile: req.file ? req.file.filename : null,
    });

    await newPartner.save();

    res.status(201).json({ message: "Partner created ✅" });

  } catch (err) {
    console.log("🔥 CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// LOGIN
router.post("/login", loginPartner);

// GET only approved ones 
router.get("/", async (req, res) => {
  try {
    const { wilaya } = req.query;

    let filter = {
      status: "approved" // 🔥 ONLY APPROVED
    };

    if (wilaya) {
      filter.wilaya = { $regex: new RegExp(`^${wilaya}$`, "i") };
    }

    const partners = await Partner.find(filter).select("-password");

    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ========================
// ME (PROTECTED ROUTE)
// ========================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const partner = await Partner.findById(req.partnerId).select("-password");
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET pending applications (admin)
router.get("/applications", async (req, res) => {
  try {
    const partners = await Partner.find({ status: "pending" });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/approve/:id", async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        canLogin: true
      },
      { new: true }
    );

    res.json({ message: "Partner approved ✅", partner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).select("-password");

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    res.json(partner);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // 🔒 1. Ensure user can only edit their own profile
    if (req.params.id !== req.partnerId) {
      return res.status(403).json({
        message: "⛔ You are not allowed to modify this profile",
      });
    }

    // 🧼 2. Build clean update object (only provided fields)
    const allowedUpdates = {};

    const fields = [
      "shopName",
      "phone",
      "shopAddress",
      "instagram",
      "description",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    });

    // 🚫 3. Prevent empty update
    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({
        message: "No valid fields to update",
      });
    }

    // 📦 4. Update safely
    const updated = await Partner.findByIdAndUpdate(
      req.partnerId,
      { $set: allowedUpdates },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    // ✅ 5. Return updated profile
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;