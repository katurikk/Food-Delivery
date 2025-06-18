require("dotenv").config();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET; // ⚠️ You should move this to .env in production

// SIGNUP: Register a new user
exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if email already exists
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (row) return res.status(400).json({ error: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (name, email, password, phone) 
        VALUES (?, ?, ?, ?)
      `;
      db.run(query, [name, email, hashedPassword, phone], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ userId: this.lastID, message: "User registered" });
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });

    res.json({ message: "Login successful", token });
  });
};
