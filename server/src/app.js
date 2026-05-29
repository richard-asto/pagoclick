const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const refundRoutes = require("./routes/refund.routes");

const app = express();
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.set("trust proxy", 1);
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "https://pagoclick-client.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));




app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts, try later" },
});

app.get("/", (req, res) => {
  res.json({ message: "API PagoClick funcionando 🚀" });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/refunds", refundRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/api/test", require("./routes/test.routes"));
}

app.get("/setup-admin", async (req, res) => {
  try {
    const User = require("./models/User");
    await User.update(
      { role: "admin" },
      { where: { email: "richard@test.com" } }
    );
    res.json({ message: "Admin set" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;