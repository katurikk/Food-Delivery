const db = require("../config/database");

// 📦 1. Get all cart items for a user
exports.getCartByUserId = (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT c.id, c.user_id, c.restaurant_id, c.item_id, m.name AS item_name, m.price AS item_price,
           c.quantity, c.special_instructions,
           (c.quantity * m.price) AS total_price
    FROM cart c
    JOIN menu_items m ON c.item_id = m.id
    WHERE c.user_id = ?
  `;
  db.all(query, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// ➕ 2. Add an item to the cart
exports.addToCart = (req, res) => {
  const { user_id, restaurant_id, item_id, quantity, special_instructions } = req.body;
  const query = `
    INSERT INTO cart (user_id, restaurant_id, item_id, quantity, special_instructions)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [user_id, restaurant_id, item_id, quantity || 1, special_instructions], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: "Item added to cart" });
  });
};

// 🛠️ 3. Update cart item quantity and instructions
exports.updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity, special_instructions } = req.body;
  const query = `
    UPDATE cart
    SET quantity = ?, special_instructions = ?
    WHERE id = ?
  `;
  db.run(query, [quantity, special_instructions, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Cart item updated" });
  });
};

// ❌ 4. Delete a single cart item
exports.deleteCartItem = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cart WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Cart item deleted" });
  });
};

// 🧹 5. Clear cart for a specific user
exports.clearCartByUserId = (req, res) => {
  const { user_id } = req.params;
  db.run("DELETE FROM cart WHERE user_id = ?", [user_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cart cleared for user" });
  });
};
