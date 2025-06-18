const db = require("../config/database");

// GET all menu items
exports.getAllMenuItems = (req, res) => {
  db.all("SELECT * FROM menu_items", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// GET a single menu item
exports.getMenuItem = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM menu_items WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json({ data: row });
  });
};

// POST a new menu item
exports.createMenuItem = (req, res) => {
  const { category_id, name, description, price, isVeg, isAvailable ,image} = req.body;
  const query = `
    INSERT INTO menu_items (category_id, name, description, price,isVeg, isAvailable,image)
    VALUES (?, ?, ?, ?, ?, ?,?)`;

  db.run(query, [category_id, name, description, price, isVeg, isAvailable,image], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Menu item created", id: this.lastID });
  });
};

// PUT to update a menu item
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, price,isVeg,  isAvailable,image } = req.body;

  const query = `
    UPDATE menu_items 
    SET category_id = ?, name = ?, description = ?, price = ?, image = ?, isAvailable = ?,isVeg=?
    WHERE id = ?`;

  db.run(query, [category_id, name, description, price,isVeg, image, isAvailable, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Menu item updated" });
  });
};

// DELETE a menu item
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM menu_items WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Menu item deleted" });
  });
};
