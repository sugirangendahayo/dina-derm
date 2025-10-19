// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getPool } from "../config/mysql.js";
const pool = getPool();

export const signup = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  try {
    const [users] = await pool.query("SELECT * FROM Users");
    const role = users.length === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO Users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, hashedPassword, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
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
      {
        id: user.id,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  const userId = req.user.id;
  try {
    const [users] = await pool.query(
      "SELECT id, first_name, last_name, email, phone, role FROM Users WHERE id = ?",
      [userId]
    );
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMe = async (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, phone, bio } = req.body;
  try {
    await pool.query(
      "UPDATE Users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?",
      [first_name, last_name, phone, userId]
    );
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { old_password, new_password } = req.body;
  try {
    const [users] = await pool.query(
      "SELECT password FROM Users WHERE id = ?",
      [userId]
    );
    const match = await bcrypt.compare(old_password, users[0].password);
    if (!match)
      return res.status(401).json({ message: "Invalid old password" });

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    await pool.query("UPDATE Users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      userId,
    ]);
    res.json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
