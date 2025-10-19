// backend/controllers/userController.js (New file)
const pool = require("../config/mysql")();

exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT id, email, role FROM Users"); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, bio } = req.body; // Assuming bio is added; add column if needed
  try {
    await pool.query("UPDATE Users SET role = ?, bio = ? WHERE id = ?", [
      role,
      bio,
      id,
    ]);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
