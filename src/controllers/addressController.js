const db = require("../config/database");

// Get all addresses
exports.getAllAddresses = (req, res) => {
  db.all("SELECT * FROM addresses", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// Get address by ID
exports.getAddressById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM addresses WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Address not found" });
    res.json({ data: row });
  });
};

// Create address
exports.createAddress = (req, res) => {
  const { user_id,type, addressLine1,addressLine2, city, state, pincode,latitude,longitude } = req.body;
  const query = `
    INSERT INTO addresses (user_id,type, addressLine1,addressLine2, city, state, pincode,latitude,longitude )
    VALUES (?, ?, ?, ?, ?, ?,?,?,?)
  `;
  db.run(query, [user_id,type, addressLine1,addressLine2, city, state, pincode,latitude,longitude ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, message: "Address created" });
  });
};

// Update address
exports.updateAddress = (req, res) => {
  const { id } = req.params;
  const { user_id,type, addressLine1,addressLine2, city, state, pincode,latitude,longitude  } = req.body;
  const query = `
    UPDATE addresses
    SET user_id = ?,type=?, addressLine1=?,addressLine2=?, city=?, state=?, pincode=?,latitude=?,longitude=? 
    WHERE id = ?
  `;
  db.run(query, [user_id,type, addressLine1,addressLine2, city, state, pincode,latitude,longitude,id ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address updated" });
  });
};

// Delete address
exports.deleteAddress = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM addresses WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address deleted" });
  });
};
