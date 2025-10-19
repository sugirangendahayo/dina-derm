const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectMySQL = require("./config/mysql");
const connectMongo = require("./config/mongo");
const authRoutes = require("./routes/routes/auth");
const productRoutes = require("./routes/routes/products");
const orderRoutes = require("./routes/routes/orders");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect databases
connectMySQL();
connectMongo();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
