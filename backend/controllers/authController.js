const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/mysql")(); // Get promise pool

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if first user
    const [users] = await pool.query("SELECT * FROM Users");
    const role = users.length === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO Users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
