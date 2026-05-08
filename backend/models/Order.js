const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  patisserieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true,
  },

  cake: Object,
  frostingColor: String,

  decor: Object,

  customer: {
    fullName: String,
    phone: String,
    address: String,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "preparing", "ready", "delivered"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);