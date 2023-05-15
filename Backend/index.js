import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
     host:"localhost",
    user:"root",
    password:"password",
    databbase:"test"
})

app.listen(8000, ()=>{
    console.log("Connected to backend")
})
