import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

db.query("USE BasicFinancialHealthcheack", (err, result) => {
  if (err) throw err;
  console.log("Database Connected using BasicFinancialHealthcheck Database");
});

export default db;
