const express = require("express");
const app = express();

// Route files
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes"); // Includes /register, /login, /profile
const addressRoutes = require("./routes/addressRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());

// Mount all routes under /api
app.use("/api", restaurantRoutes);   // /api/restaurants
app.use("/api", menuRoutes);         // /api/menu
app.use("/api", orderRoutes);        // /api/orders
app.use("/api", userRoutes);         // /api/users, /api/register, /api/login, /api/profile
app.use("/api", addressRoutes);      // /api/addresses
app.use("/api", cartRoutes);         // /api/cart
app.use("/api", reviewRoutes);       // /api/reviews
app.use("/api", paymentRoutes);      // /api/payments

module.exports = app;
