import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from './db_connect.js';
import url from "url";  
// Import required modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//MySQL Connection

// Create an Express app
const app = express();
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use(express.static("../Frontend/public", { type: "text/css" }));


// Listen for requests at the root path and send the index.html file as a response
app.get("/dashboard/grading", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../Frontend/Gradingpage/Test Grade/index.html"
  );
  res.sendFile(filePath);
});
//
app.get("/dashboard", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Dashboard/index.html");
  res.sendFile(filePath);
});

app.get('/signup', (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signup/index.html");
  res.sendFile(filePath);
});

app.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});


app.post("/auth/login", (req, res) => {
  //todo check login เอาข้อมูลจากRegistration
  const { email, password } = req.body;
  db.query('SELECT * FROM Registration WHERE User_Email = ? AND User_Password = ?', [email, password], (err, result) => {
    if(err) throw err;
    if(result.length > 0){
      res.redirect(url.format({
        pathname:"/dashboard",
        query: {
          'userid': result[0].id
        }
      }));
    }else{
      res.status(401).json({ error: "email or password is incorrect." });
    }
  });

// Personal profile To grading 
let personalProfileData = null; // Variable to store the user's personal profile data temporarily

// Route for the Personal profile page (GET request)
app.get('/Userprofile', (req, res) => {
  res.sendFile(__dirname + '../Frontend/Userprofile.html');
});

// Route for handling the Personal profile form submission (POST request)
app.post('/personalprofile', (req, res) => {
  personalProfileData = req.body; // Store the personal profile data from the request body
  res.redirect('../Frontend/Gradingpage'); // Redirect to the Grading page
});

// Route for the Grading page (GET request)
app.get('../Frontend/Gradingpage', (req, res) => {
  // Use the personalProfileData for calculations and rendering the Grading page
  // You can access the individual fields like personalProfileData.income, personalProfileData.expense, etc.
  
  // Example calculation: Calculate the money index
  const moneyIndex = personalProfileData.income - personalProfileData.expense;

  // Render the Grading page and pass the calculated values as variables
  res.render('../Frontend/Gradingpage', { moneyIndex });
});

// Next 

});

// หน้า Sub page จากหน้าashboard
// Routes for the sub-pages of the dashboard

app.get('/dashboard/Grading', (req, res) => {
  res.sendFile(__dirname + '/financial-health.html');
});

app.get("/dashboard/Suggestions", (req, res) => {
  //Frontend/Suggestions/Test Suggestion/main.html
  const filePath = path.join(
    __dirname,
    "../Frontend/Suggestions/Test Suggestion/main.html"
  );
  res.sendFile(filePath);
});

app.get("/dashboard/Personalized-jars", (req, res) => {
  //Frontend/9Jars-Moneymanagement/Personalized Jars/main.html
  const filePath = path.join(
    __dirname,
    "../Frontend/9Jars-Moneymanagement/Personalized Jars/main.html"
  );
  res.sendFile(filePath);
});

app.get("/dashboard/Fixed-jars", (req, res) => {
  //
  const filePath = path.join(
    __dirname,
    "../Frontend/9Jars-Moneymanagement/Fixed Jars/test jar/index.html"
  );
  res.sendFile(filePath);
});

app.get("/dashboard/Calculation", (req, res) => {
  //Frontend/Calculation/index.html
  const filePath = path.join(__dirname, "../Frontend/Calculation/index.html");
  res.sendFile(filePath);
});

app.get("/dashboard/UserProfile", (req, res) => {
  //Frontend/Personal Info/index.html
  const filePath = path.join(__dirname, "../Frontend/Personal Info/index.html");
  res.sendFile(filePath);
});

app.get("/dashboard/test-grading", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../Frontend/Gradingpage/Test Grade/index.html"
  );
  res.sendFile(filePath);
});


// ---------------------------------------------//
//Display lasted Grading lelvel
// Route for handling the POST request from the Grading page
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post("/dashboard/grading", (req, res) => {
//   const result = req.body.result; // Get the result from the request body
//   // Do something with the result, e.g., save it to a database

//   // Redirect the user back to the Dashboard page and pass the result as a query parameter
//   res.redirect("/dashboard?result=" + result);
// });

app.get('/api/get-grade-info/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM BasicFinancialHealthcheck.GradeLevel where UserID=?', [id], (err, result) => {
    if(err) throw err;
    if(result.length>0){
      res.json(result[0]);
    }
    else{
      res.json({message: "No data found."});
    }
  })
});

// Get user financial health(temp) by id
// send params as an id.
app.get("/api/get-financial-health/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT g.Grade_level, n.Jar_Ness+n.Jar_Edu+n.Jar_Play+n.Jar_Give+n.Jar_Insurance+n.Jar_Retirement+n.Jar_Emergency+n.Jar_MoneyFreedom+n.Jar_Debt as Total FROM GradeLevel as g INNER JOIN NineJars as n on g.UserID=n.JarID WHERE g.UserID=?", [id], (err, result) => {
    if(err) throw err;
    if(result.length>0){
      const payload ={
        moneyLevel : result[0].Grade_level,
        jars : result[0].Total,
      }
      res.json(payload); 
    }
  });

});

// update user financial health(temp) by id
app.post("/api/insert-financial-health", (req, res) => {

  console.log(req.body);
  const {userid, savingRatio, debtRatio, emergencyFundRatio, netWorth, moneyLevel} = req.body;
  const level = moneyLevel.split('.')[1];
  db.query('INSERT INTO GradeLevel (UserID, GradeID,Grade_level,Grade_SavingRatio,Grade_DebtRatio,Grade_EmergencyRatio,Grade_Networth,Grade_level_name,Grade_description,Grade_Record) VALUES(?,?,?,?,?,?,?,?,?, NOW() ) ON DUPLICATE KEY UPDATE    Grade_level = ?,Grade_SavingRatio = ?,Grade_DebtRatio = ?,Grade_EmergencyRatio = ?,Grade_Networth = ?,Grade_level_name = ?,Grade_description = ?,Grade_Record = NOW();',[userid,userid, level,savingRatio, debtRatio, emergencyFundRatio, netWorth, '','',level, savingRatio, debtRatio, emergencyFundRatio, netWorth, '', ''],
  (err,result)=>{
    if(err) throw err

    if(result.affectedRows > 0){
      res.json({status:'success'});
    }else{
      res.json({status:'failed'});  
    }
  })
});

app.get('/api/get-jars/:id',(req,res)=>{
  const userid = req.params.id;
  db.query('SELECT * FROM NineJars WHERE JarID=?',[userid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.json(result[0]);
    }
    else{
      res.json({status:'failed'});
    }
  });
});

app.put('/api/update-jars/:id', (req, res) => {
  const id = req.params.id;
  const jar = req.body.jar;
  console.log(jar);
  db.query('UPDATE NineJars SET Jar_Ness=?,Jar_Edu=?,Jar_Play=?,Jar_Give=?,Jar_Insurance=?,Jar_Retirement=?,Jar_Emergency=?,Jar_MoneyFreedom=?,Jar_Debt=? WHERE JarID=?',[jar.necessity,jar.education,jar.play,jar.giving,jar.insurance,jar.retirement,jar.emergency,jar.freedom,jar.debt,id],(err,result)=>{
    if(err) throw err;

    if(result.affectedRows>0){
      res.json({status:'success'});
    }else{
      res.json({status:'failed'});

    }
  });
})

// ---------------------------------------------//
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});
// Start the server and listen on a specific port, e.g., 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
