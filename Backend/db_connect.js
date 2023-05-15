import mysql from "mysql";


const db = mysql.createConnection({
    host:"localhost",
    user:"",
    password:"",
});

db.query("USE BasicFinancialHealthcheck",(err,result)=>{
    if(err) throw err;
    console.log("Database Connected using BasicFinancialHealthcheck Database");
});

export default db;



