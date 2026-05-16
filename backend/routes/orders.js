const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// 🔥 CREATE ORDER
router.post("/", async (req, res) => {
  try {
    console.log("🔥 ORDER RECEIVED:", req.body);

    const { patisserieId } = req.body;

    if (!patisserieId) {
      return res.status(400).json({
        message: "patisserieId missing",
        received: req.body,
      });
    }

    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "Order created ✅",
      order,
    });
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// 🔥 GET ORDERS FOR ONE PATISSERIE
router.get("/patisserie/:id", async (req, res) => {
  try {
    const orders = await Order.find({
      patisserieId: req.params.id,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔥 UPDATE ORDER STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "accepted",
      "preparing",
      "ready",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;