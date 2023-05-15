import mysql from "mysql";


const db = mysql.createConnection({
    host:"localhost",
    user:"bfc_user",
    password:"localhost",
    databbase:"BasicFinancialHealthcheack"
});

db.query("USE BasicFinancialHealthcheack",(err,result)=>{
    if(err) throw err;
    console.log("Database Connected using BasicFinancialHealthcheack Database");
});

export default db;



