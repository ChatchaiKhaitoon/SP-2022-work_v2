import { Router } from "express";
import db from "../db_connect.js";
import { calculate } from "../utils/calGradelevel.js";
import url from "url";

const apirouter = Router();

apirouter.get("/get-user/:id", (req, res) => {
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

apirouter.post("/update-userinfo", (req, res) => {
  const {
    UserID,
    User_Name,
    User_Email,
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
  } = req.body;
  if (req.body === undefined) {
    res.status(405).json({ error: "payload is missing." });
  } else {
    let { moneyLevel, savingRatio, debtRatio, emergencyFundRatio, netWorth } =
      calculate(
        User_income_per_month,
        User_expense_per_month,
        User_saving,
        User_fixed_cost,
        User_asset,
        User_liabilities
      );
    const gradeLevel = moneyLevel.split(".")[1];
    emergencyFundRatio =
      emergencyFundRatio == Infinity ? 0 : emergencyFundRatio;
    // don't ask why I use this, I don't know either.
    db.query(
      `
        INSERT INTO BasicFinancialHealthcheack.Userinfo (UserID, User_Name, User_birthday, User_phone, User_sex, User_marital_status, User_alias, User_income, User_job, User_income_per_month, User_expense, User_expense_per_month, User_fixed_cost, User_asset, User_liabilities, User_saving)
        VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
        ON DUPLICATE KEY
        UPDATE User_Name = ?,User_birthday = ?,User_phone = ?,User_sex = ?,User_marital_status = ?,User_alias = ?,User_income = ?,User_job = ?,User_income_per_month = ?,User_expense = ?,User_expense_per_month = ?,User_fixed_cost = ?,User_asset = ?,User_liabilities = ?,User_saving = ?;
        
        INSERT INTO GradeLevel (GradeID, Grade_level, Grade_SavingRatio, Grade_DebtRatio, Grade_EmergencyRatio, Grade_Networth, UserID)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        Grade_level = ?, Grade_SavingRatio=?, Grade_DebtRatio=?, Grade_EmergencyRatio=?, Grade_Networth=?;
        
        INSERT INTO NineJars (JarID)
        SELECT * FROM (SELECT ?) AS tmp
        WHERE NOT EXISTS (SELECT JarID FROM NineJars WHERE JarID = ?);
              
        UPDATE BasicFinancialHealthcheack.registration 
        SET 
        User_Email = ?
        WHERE
        id = ?;
      `,
      [
        //Userinfo
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
        //GradeLevel
        UserID,
        gradeLevel,
        savingRatio,
        debtRatio,
        emergencyFundRatio,
        netWorth,
        UserID,
        gradeLevel,
        savingRatio,
        debtRatio,
        emergencyFundRatio,
        netWorth,
        //NineJars
        UserID,
        UserID,
        //Registration
        User_Email,
        UserID,
      ],
      (err) => {
        if (err) {
          res.status(500).json({ error: err });
          throw err;
        } else {
          res.redirect(
            url.format({ pathname: "/dashboard", query: { userid: UserID } })
          );
        }
      }
    );
  }
});

apirouter.get("/get-grade-info/:id", (req, res) => {
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
apirouter.get("/get-financial-health/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT g.Grade_level, n.Jar_Ness+n.Jar_Edu+n.Jar_Play+n.Jar_Give+n.Jar_Insurance+n.Jar_Retirement+n.Jar_Emergency+n.Jar_MoneyFreedom+n.Jar_Debt as Total FROM GradeLevel as g INNER JOIN NineJars as n on g.UserID=n.JarID WHERE g.UserID=?",
    [id],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const payload = {
          moneyLevel: result[0].Grade_level,
          jars: result[0].Total === null? 0 : result[0].Total,
        };
        res.json(payload);
      }
    }
  );
});

// update user financial health(temp) by id
apirouter.post("/insert-financial-health", (req, res) => {
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
      if (err) {
        res.status(500).json({ error: err });
        throw err;
      }

      if (result.affectedRows > 0) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    }
  );
});

apirouter.get("/get-jars/:id", (req, res) => {
  const userid = req.params.id;
  db.query("SELECT * FROM NineJars WHERE JarID=?", [userid], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      throw err;
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ status: "failed" });
    }
  });
});

apirouter.put("/update-jars/:id", (req, res) => {
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
      if (err) {
        res.status(500).json({ error: err });
        throw err;
      }

      if (result.affectedRows > 0) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    }
  );
});

export default apirouter;
