const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Partner = require("../models/Partners");

exports.loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const partner = await Partner.findOne({ email });

    if (!partner) {
      return res.status(400).json({ message: "Partner not found" });
    }

    const isMatch = await bcrypt.compare(password, partner.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    if (!partner.canLogin || partner.status !== "approved") {
  return res.status(403).json({
    message: "Compte non encore validé. Nous vous contacterons sous 24h."
  });
}

    const token = jwt.sign(
      { id: partner._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success 🚀",
      token,   // 🔥 IMPORTANT
      partner: {
        id: partner._id,
        email: partner.email,
        shopName: partner.shopName,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};