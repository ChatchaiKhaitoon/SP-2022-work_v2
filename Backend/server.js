import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./db_connect.js";
import url from "url";
// Import required modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.get("/register", (req, res) => {
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
  db.query(
    "SELECT * FROM Registration WHERE User_Email = ? AND User_Password = ?",
    [email, password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.redirect(
          url.format({
            pathname: "/profile",
            query: {
              userid: result[0].id,
            },
          })
        );
      } else {
        res.status(401).json({ error: "email or password is incorrect." });
      }
    }
  );

  //
});

app.post("/auth/register", async (req, res) => {
  if (req.body == undefined)
    return res.status(401).json({ message: "expect payload to not be empty." });
  const { username, email, password } = req.body;
  // const {
  //   id,
  //   name,
  //   age,
  //   income,
  //   expense,
  //   fixCost,
  //   variableCost,
  //   asset,
  //   liabilities,
  //   externalDebt,
  //   internalDebt,
  //   insurance,
  //   saving,
  // } = req.body.userInfo;
  // db.query(
  //   `insert into Userinfo
  // value(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  //   [
  //     id,
  //     name,
  //     age,
  //     income,
  //     expense,
  //     fixCost,
  //     variableCost,
  //     asset,
  //     liabilities,
  //     externalDebt,
  //     internalDebt,
  //     insurance,
  //     saving,
  //   ]
  // ),
  //   (err, result) => {
  //     if (err) throw err;
  //     res.location("/profile/", id);
  //   };

  db.query(
    `insert into registration(User_Email, User_password)
  value(?,?)`,
    [email, password],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      db.query(
        "SELECT id FROM BasicFinancialHealthcheack.Registration",
        (err, result) => {
          if (err) {
            res.status(500).json({ error: err });
          }
          const id = result[result.length - 1].id;
          res.redirect(
            url.format({
              pathname: "/profile",
              query: { userid: id },
            })
          );
        }
      );
    }
  );
  // db.query(
  //   `insert into GradeLevel
  // value(?,0,0,0,0,0,0,'','',NOW(),?);`,
  //   [id, id],
  //   (err, result) => {
  //     if (err) throw err;
  //   }
  // );
  // db.query(
  //   `insert into NineJars
  // value(?,0,0,0,0,0,0,0,0,0,0);`,
  //   [id],
  //   (err, result) => {
  //     if (err) throw err;
  //   }
  // );
});

// หน้า Sub page จากหน้าashboard
// Routes for the sub-pages of the dashboard

app.get("/dashboard/Grading", (req, res) => {
  res.sendFile(__dirname + "/financial-health.html");
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

app.get("/profile", (req, res) => {
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
app.get("/api/get-user/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT 
    u.UserID,
    u.User_Name,
    u.User_birthday,
    u.User_phone,
    u.User_sex,
    u.User_marital_status,
    u.User_alias,
    u.User_income,
    u.User_job,
    u.User_income_per_month,
    u.User_expense,
    u.User_expense_per_month,
    u.User_fixed_cost,
    u.User_asset,
    u.User_liabilities,
    u.User_saving,
    u.User_variable_cost,
    u.User_external_debt, 
    u.User_internal_debt, 
    u.User_insurance ,
    r.User_Email,
    r.id
    FROM BasicFinancialHealthcheack.Userinfo as u
    JOIN BasicFinancialHealthcheack.registration as r 
    ON u.UserID = r.id
    WHERE u.UserID=?`,
    [id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        throw err;
      }
      res.json(result);
    }
  );
});

app.post("/api/update-userinfo", (req, res) => {
  const {
    UserID,
    User_Name,
    User_birthday,
    User_phone,
    User_sex,
    User_marital_status,
    User_alias,
    User_income,
    User_job,
    User_income_per_month,
    User_expense,
    User_expense_per_month,
    User_fixed_cost,
    User_asset,
    User_liabilities,
    User_saving,
    User_Email,
  } = req.body;
  if (req.body === undefined) {
    res.status(405).json({ error: "payload is missing." });
  } else {
    // don't ask why I use this, I don't know either.
    console.log(req.body);
    db.query(
      `
    START TRANSACTION;
      UPDATE BasicFinancialHealthcheack.Userinfo 
      SET User_Name = ?,
        User_birthday = ?,
        User_phone = ?,
        User_sex = ?,
        User_marital_status = ?,
        User_alias = ?,
        User_income = ?,
        User_job = ?,
        User_income_per_month = ?,
        User_expense = ?,
        User_expense_per_month = ?,
        User_fixed_cost = ?,
        User_asset = ?,
        User_liabilities = ?,
        User_saving = ?
      WHERE
        UserID = ?;
      
      UPDATE BasicFinancialHealthcheack.registration 
      SET 
        User_Email = ?
      WHERE
        id = ?;
    COMMIT;
    `,
      [
        User_Name,
        User_birthday,
        User_phone,
        User_sex,
        User_marital_status,
        User_alias,
        User_income,
        User_job,
        User_income_per_month,
        User_expense,
        User_expense_per_month,
        User_fixed_cost,
        User_asset,
        User_liabilities,
        User_saving,
        UserID,
        User_Email,
        UserID,
      ],
      (err, result) => {
        if (err) throw err;
        else {
          console.log(result);
          res.json({ message: "Update success." });
        }
      }
    );
  }
});

app.get("/api/get-grade-info/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM BasicFinancialHealthcheck.GradeLevel where UserID=?",
    [id],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.json({ message: "No data found." });
      }
    }
  );
});

// Get user financial health(temp) by id
// send params as an id.
app.get("/api/get-financial-health/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT g.Grade_level, n.Jar_Ness+n.Jar_Edu+n.Jar_Play+n.Jar_Give+n.Jar_Insurance+n.Jar_Retirement+n.Jar_Emergency+n.Jar_MoneyFreedom+n.Jar_Debt as Total FROM GradeLevel as g INNER JOIN NineJars as n on g.UserID=n.JarID WHERE g.UserID=?",
    [id],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const payload = {
          moneyLevel: result[0].Grade_level,
          jars: result[0].Total,
        };
        res.json(payload);
      }
    }
  );
});

// update user financial health(temp) by id
app.post("/api/insert-financial-health", (req, res) => {
  console.log(req.body);
  const {
    userid,
    savingRatio,
    debtRatio,
    emergencyFundRatio,
    netWorth,
    moneyLevel,
  } = req.body;
  const level = moneyLevel.split(".")[1];
  db.query(
    "INSERT INTO GradeLevel (UserID, GradeID,Grade_level,Grade_SavingRatio,Grade_DebtRatio,Grade_EmergencyRatio,Grade_Networth,Grade_level_name,Grade_description,Grade_Record) VALUES(?,?,?,?,?,?,?,?,?, NOW() ) ON DUPLICATE KEY UPDATE    Grade_level = ?,Grade_SavingRatio = ?,Grade_DebtRatio = ?,Grade_EmergencyRatio = ?,Grade_Networth = ?,Grade_level_name = ?,Grade_description = ?,Grade_Record = NOW();",
    [
      userid,
      userid,
      level,
      savingRatio,
      debtRatio,
      emergencyFundRatio,
      netWorth,
      "",
      "",
      level,
      savingRatio,
      debtRatio,
      emergencyFundRatio,
      netWorth,
      "",
      "",
    ],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows > 0) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    }
  );
});

app.get("/api/get-jars/:id", (req, res) => {
  const userid = req.params.id;
  db.query("SELECT * FROM NineJars WHERE JarID=?", [userid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ status: "failed" });
    }
  });
});

app.put("/api/update-jars/:id", (req, res) => {
  const id = req.params.id;
  const jar = req.body.jar;
  console.log(jar);
  db.query(
    "UPDATE NineJars SET Jar_Ness=?,Jar_Edu=?,Jar_Play=?,Jar_Give=?,Jar_Insurance=?,Jar_Retirement=?,Jar_Emergency=?,Jar_MoneyFreedom=?,Jar_Debt=? WHERE JarID=?",
    [
      jar.necessity,
      jar.education,
      jar.play,
      jar.giving,
      jar.insurance,
      jar.retirement,
      jar.emergency,
      jar.freedom,
      jar.debt,
      id,
    ],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows > 0) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    }
  );
});

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
