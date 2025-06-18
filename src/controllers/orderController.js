const db = require("../config/database");

// Get all orders
exports.getAllOrders = (req, res) => {
  const query = "SELECT * FROM orders";
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// Get single order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM orders WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Order not found" });
    res.json({ data: row });
  });
};

// Create new order
exports.createOrder = (req, res) => {
  const { order_id,user_id, restaurant_id, address_id,total_amount, delivery_fee,payment_method,special_instructions,status,ordered_at } = req.body;
  const query = `
    INSERT INTO orders (order_id,user_id, restaurant_id, address_id,total_amount, delivery_fee,payment_method,special_instructions,status,ordered_at)
    VALUES (?,?, ?, ?, ?,?,?,?,?,?)`;
  db.run(query, [order_id,user_id, restaurant_id, address_id,total_amount, delivery_fee,payment_method,special_instructions,status||"pending",ordered_at ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Order created", id: this.lastID });
  });
};

// Update order
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { order_id,user_id, restaurant_id, address_id,total_amount, delivery_fee,payment_method,special_instructions,status,ordered_at } = req.body;
  const query = `
    UPDATE orders
    SET order_id=?,user_id=?, restaurant_id=?, address_id=?,total_amount=?, delivery_fee=?,payment_method=?,special_instructions=?,status=?,ordered_at=?
    WHERE id = ?`;
  db.run(query, [order_id,user_id, restaurant_id, address_id,total_amount, delivery_fee,payment_method,special_instructions,status,ordered_at], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order updated" });
  });
};

// Delete order
exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM orders WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  });
};
