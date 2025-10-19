import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

export const getConnection = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("MySQL connection error:", err);
      return;
    }
    console.log("MySQL connected");
    connection.release();
  });
};

export const getPool = () => {
  return pool.promise(); // Return promise-based pool for async queries
};
