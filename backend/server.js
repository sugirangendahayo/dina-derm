import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { getConnection } from "./config/mysql.js";
import connectMongo from "./config/mongo.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";
// import stripeRoutes from "./routes/stripe.js";
import multer from "multer";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(bodyParser.json());

// Connect databases
getConnection();
connectMongo();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/stripe", stripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
