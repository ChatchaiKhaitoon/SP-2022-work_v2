//import mysql from "mysql";
import mysql from "mysql2";


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "chatchu2000",
  database: "BasicFinancialHealthcheack",
});

db.query("USE BasicFinancialHealthcheack", (err, result) => {
  if (err) throw err;
  console.log("Database Connected using BasicFinancialHealthcheck Database");
});

export default db;
