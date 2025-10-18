const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("MySQL connection error:", err);
      return;
    }
    console.log("MySQL connected");
    connection.release();
  });
  return pool.promise(); // Return promise-based pool for async queries
};
