const pool = require("../config/mysql")();

exports.createOrder = async (req, res) => {
  const { items } = req.body; // items: [{variant_id, quantity, price}]
  const user_id = req.user.id; // From JWT
  let total_amount = 0;
  items.forEach((item) => (total_amount += item.quantity * item.price));

  try {
    const [orderResult] = await pool.query(
      "INSERT INTO Orders (user_id, total_amount) VALUES (?, ?)",
      [user_id, total_amount]
    );
    const order_id = orderResult.insertId;

    for (const item of items) {
      await pool.query(
        "INSERT INTO Order_Items (order_id, variant_id, quantity, price) VALUES (?, ?, ?, ?)",
        [order_id, item.variant_id, item.quantity, item.price]
      );
    }

    res.status(201).json({ order_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const user = req.user;
  try {
    let query = "SELECT * FROM Orders";
    let params = [];
    if (user.role !== "admin") {
      query += " WHERE user_id = ?";
      params = [user.id];
    }
    const [orders] = await pool.query(query, params);
    // Fetch order items if needed
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
