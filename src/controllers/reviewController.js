const db = require("../config/database");

// Get all reviews
exports.getAllReviews = (req, res) => {
  db.all("SELECT * FROM reviews", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// Get review by ID
exports.getReviewById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM reviews WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Review not found" });
    res.json({ data: row });
  });
};

// Get review by Order ID
exports.getReviewByOrderId = (req, res) => {
  const { order_id } = req.params;
  db.get("SELECT * FROM reviews WHERE order_id = ?", [order_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Review not found for this order" });
    res.json({ data: row });
  });
};

// Create review
exports.createReview = (req, res) => {
  const { order_id, restaurant_rating, food_rating, delivery_rating, comment } = req.body;
  const query = `
    INSERT INTO reviews (order_id, restaurant_rating, food_rating, delivery_rating, comment)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [order_id, restaurant_rating, food_rating, delivery_rating, comment], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: "Review submitted" });
  });
};

// Update review
exports.updateReview = (req, res) => {
  const { id } = req.params;
  const { restaurant_rating, food_rating, delivery_rating, comment } = req.body;
  const query = `
    UPDATE reviews
    SET restaurant_rating = ?, food_rating = ?, delivery_rating = ?, comment = ?
    WHERE id = ?
  `;
  db.run(query, [restaurant_rating, food_rating, delivery_rating, comment, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review updated" });
  });
};

// Delete review
exports.deleteReview = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM reviews WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  });
};
