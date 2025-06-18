const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Get All Users
exports.getAllUsers = (req, res) => {
  db.all("SELECT id, name, email, phone, created_at FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ users: rows });
  });
};

// ✅ Get User By ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.get("SELECT id, name, email, phone, created_at FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  });
};

// ✅ Create User (Admin purpose or duplicate of registerUser)
exports.createUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (name, email, password, phone)
        VALUES (?, ?, ?, ?)
      `;

      db.run(query, [name, email, hashedPassword, phone], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ id: this.lastID, message: "User created successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  const query = `
    UPDATE users
    SET name = ?, email = ?, phone = ?
    WHERE id = ?
  `;

  db.run(query, [name, email, phone, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
};

// ✅ Delete User
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  db.run("DELETE FROM users WHERE id = ?", [userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
};

// ✅ User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (name, email, password, phone)
        VALUES (?, ?, ?, ?)
      `;

      db.run(query, [name, email, hashedPassword, phone], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ id: this.lastID, message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ User Login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  });
};

// ✅ Protected Route: View User Profile
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT id, name, email, phone, created_at 
    FROM users 
    WHERE id = ?
  `;

  db.get(query, [userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "User not found" });

    res.json({ profile: row });
  });
};
