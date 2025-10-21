// backend/controllers/userController.js
import { getPool } from "../config/mysql.js";
const pool = getPool();

export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, first_name, last_name, email, phone, role FROM Users"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, bio, role } = req.body;
  try {
    await pool.query(
      "UPDATE Users SET first_name = ?, last_name = ?, phone = ?, role = ? WHERE id = ?",
      [first_name, last_name, phone, bio, role, id]
    );
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
