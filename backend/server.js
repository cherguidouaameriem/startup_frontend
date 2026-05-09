const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// 🔥 MIDDLEWARE
app.use(cors({
  origin: [
    "https://startup-frontend-cherguidouaameriems-projects.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// 🔥 ROUTES
const partnerRoutes = require("./routes/partnersRoutes");
app.use("/api/partners", partnerRoutes);
const orderRoutes = require("./routes/orders");

app.use("/api/orders", orderRoutes);
// 🔥 MONGO CONNECTION (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
