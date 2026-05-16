const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// 🔥 CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { patisserieId, cake, decor, fillingsByLayer, frostingColor, customer, deliveryDate } = req.body;

    if (!patisserieId || !cake) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 🔥 START PRICE
    let totalPrice = Number(cake?.basePrice) || 0;

    // 🔥 DECOR
    const decorPricing = {
      "pouchage 1": 100,
      "Décoration de gâteau": 300,
    };

    (decor?.types || []).forEach((d) => {
      totalPrice += decorPricing[d] || 0;
    });

    // 🔥 FILLINGS
    const fillingsPricing = {
      chocolat: 100,
      caramel: 120,
      lotus: 180,
      fraise: 130,
      nutella: 200,
    };

    (fillingsByLayer || []).forEach((f) => {
      if (!f) return;
      const key = String(f).toLowerCase().trim();
      totalPrice += fillingsPricing[key] || 0;
    });

    // 🔥 DEBUG IMPORTANT (AJOUTE CA TEMPORAIRE)
    console.log("💰 TOTAL PRICE CALCULATED:", totalPrice);

    const order = new Order({
      patisserieId,
      cake,
      decor,
      fillingsByLayer,
      frostingColor,
      customer,
      deliveryDate,
      totalPrice, // 🔥 ONLY THIS VALUE
    });

    const saved = await order.save();

    console.log("✅ SAVED ORDER:", saved.totalPrice);

    return res.status(201).json({
      message: "Order created ✅",
      order: saved,
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    return res.status(500).json({ error: err.message });
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