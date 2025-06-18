const db = require("../config/database");

// GET all
exports.getAllRestaurants = (req, res) => {
  db.all("SELECT * FROM restaurants", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: rows });
  });
};

// GET one
exports.getRestaurantById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM restaurants WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json({ data: row });
  });
};

// CREATE
exports.createRestaurant = (req, res) => {
  const {
    name,
    cuisine,
    description,
    address,
    latitude,
    longitude,
    opening_time,
    closing_time,
    min_order_amount,
    delivery_fee,
    avg_preparation_time,
    status,
    rating
  } = req.body;

  const query = `
    INSERT INTO restaurants (
      name, cuisine, description, address, latitude, longitude,
      opening_time, closing_time, min_order_amount, delivery_fee,
      avg_preparation_time, status, rating
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name, cuisine, description, address, latitude, longitude,
    opening_time, closing_time, min_order_amount, delivery_fee,
    avg_preparation_time, status, rating
  ];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Restaurant created", id: this.lastID });
  });
};


// UPDATE
exports.updateRestaurant = (req, res) => {
  const { id } = req.params;
  const {
    name,
    cuisine,
    description,
    address,
    latitude,
    longitude,
    opening_time,
    closing_time,
    min_order_amount,
    delivery_fee,
    avg_preparation_time,
    status,
    rating
  } = req.body;

  const query = `
    UPDATE restaurants SET
      name = ?, 
      cuisine = ?, 
      description = ?, 
      address = ?, 
      latitude = ?, 
      longitude = ?, 
      opening_time = ?, 
      closing_time = ?, 
      min_order_amount = ?, 
      delivery_fee = ?, 
      avg_preparation_time = ?, 
      status = ?, 
      rating = ?
    WHERE id = ?
  `;

  const values = [
    name,
    cuisine,
    description,
    address,
    latitude,
    longitude,
    opening_time,
    closing_time,
    min_order_amount,
    delivery_fee,
    avg_preparation_time,
    status,
    rating,
    id
  ];

  db.run(query, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Restaurant not found" });
    res.json({ message: "Restaurant updated successfully" });
  });
};


// DELETE
exports.deleteRestaurant = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM restaurants WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Restaurant deleted" });
  });
};

