const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authenticate = require("../middleware/authmiddleware");

// 1️⃣ View User Profile
router.get("/profile", authenticate, (req, res) => {
  const userId = req.user.id;

  db.get("SELECT id, name, email, phone, created_at FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ user: row });
  });
});

// 2️⃣ View My Orders
router.get("/my-orders", authenticate, (req, res) => {
  const userId = req.user.id;

  db.all("SELECT * FROM orders WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ orders: rows });
  });
});

// 3️⃣ Modify Cart (Update quantity and instructions)
router.put("/cart/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;
  const { quantity, special_instructions } = req.body;

  db.run(
    `UPDATE cart SET quantity = ?, special_instructions = ? WHERE id = ? AND user_id = ?`,
    [quantity, special_instructions, cartId, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Cart item not found or not yours" });
      res.json({ message: "Cart updated successfully" });
    }
  );
});

// 4️⃣ Place Order
router.post("/orders", authenticate, (req, res) => {
  const userId = req.user.id;
  const { restaurant_id, items, total_price, delivery_address } = req.body;

  const query = `INSERT INTO orders (user_id, restaurant_id, items, total_price, delivery_address, status) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    query,
    [userId, restaurant_id, items, total_price, delivery_address, "placed"],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ order_id: this.lastID, message: "Order placed successfully" });
    }
  );
});

// 5️⃣ Submit Review
router.post("/reviews", authenticate, (req, res) => {
  const userId = req.user.id;
  const { order_id, restaurant_rating, food_rating, delivery_rating, comment } = req.body;

  // Ensure user owns the order
  db.get("SELECT * FROM orders WHERE id = ? AND user_id = ?", [order_id, userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(403).json({ error: "You can only review your own orders" });

    const query = `INSERT INTO reviews (order_id, restaurant_rating, food_rating, delivery_rating, comment)
                   VALUES (?, ?, ?, ?, ?)`;

    db.run(
      query,
      [order_id, restaurant_rating, food_rating, delivery_rating, comment],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Review submitted", review_id: this.lastID });
      }
    );
  });
});

module.exports = router;
