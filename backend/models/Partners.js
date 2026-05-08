const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  shopName: String,
  ownerName: String,
  phone: String,
  email: String,
  password: String,
  shopAddress: String,
  wilaya: String,
  instagram: String,
  facebookPage: String,
  website: String,
  description: String,
  logoFile: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
  type: String,
  enum: ["Gratuit", "Starter", "Premium"],
  default: "Gratuit"
},

status: {
  type: String,
  enum: ["pending", "contacting", "approved", "rejected"],
  default: "pending"
},

canLogin: {
  type: Boolean,
  default: false
}
});

module.exports = mongoose.model("Partner", partnerSchema);