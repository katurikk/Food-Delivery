const db = require("../config/database");

// Get all payments
exports.getAllPayments = (req, res) => {
  db.all("SELECT * FROM payments", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM payments WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Payment not found" });
    res.json({ data: row });
  });
};

// Create a new payment
exports.createPayment = (req, res) => {
  const { order_id, method, status } = req.body;
  const query = `
    INSERT INTO payments (order_id, method, status)
    VALUES (?, ?, ?)
  `;
  db.run(query, [order_id, method, status], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: "Payment created" });
  });
};

// Update payment
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { order_id, method, status } = req.body;
  const query = `
    UPDATE payments
    SET order_id = ?, method = ?, status = ?
    WHERE id = ?
  `;
  db.run(query, [order_id, method, status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Payment not found" });
    res.json({ message: "Payment updated" });
  });
};

// Delete payment
exports.deletePayment = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM payments WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Payment not found" });
    res.json({ message: "Payment deleted" });
  });
};
