// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getPool } from "../config/mysql.js";
const pool = getPool();

// Add this validation function to your backend authController.js
const validateSignupData = (data) => {
  const errors = [];

  if (!data.first_name || data.first_name.length < 2) {
    errors.push("First name must be at least 2 characters");
  }

  if (!data.last_name || data.last_name.length < 2) {
    errors.push("Last name must be at least 2 characters");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.phone || !/^\+?[\d\s-()]{10,}$/.test(data.phone)) {
    errors.push("Valid phone number is required");
  }

  if (!data.password || data.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.push("Password must contain uppercase, lowercase, and number");
  }

  return errors;
};

// Update your signup function to include validation
export const signup = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  
  // Validate input data
  const validationErrors = validateSignupData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ 
      error: "Validation failed",
      details: validationErrors 
    });
  }

  try {
    // Check if email already exists
    const [existingUsers] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const [users] = await pool.query("SELECT * FROM Users");
    const role = users.length === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO Users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, hashedPassword, role]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
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
