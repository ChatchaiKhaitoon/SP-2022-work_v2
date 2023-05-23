import { Router } from "express";
import db from "../db_connect.js";
import url from "url";
const authrouter = Router();

/**
Check email and password from Registration table.
*/
authrouter.post("/login", (req, res) => {
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

/**
Register new user.
Create new user in Registration table and Userinfo table.
After creaetion, redirect to profile page with userid.
*/
authrouter.post("/register", async (req, res) => {
  if (req.body == undefined)
    return res.status(401).json({ message: "expect payload to not be empty." });
  const { username, email, password } = req.body;

  db.query(
    `
    INSERT INTO Registration(User_Email, User_password)
    value(?,?); 
    
    INSERT INTO Userinfo (UserID, User_Name)
    SELECT *,? FROM (SELECT id FROM REGISTRATION ORDER BY id DESC LIMIT 1) as TEP;
    
    SELECT id FROM Registration 
    ORDER BY id DESC LIMIT 1;
    
    `,
    [email, password, username],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        throw err;
      } else {
        const id = result[2][0].id;

        res.redirect(
          url.format({
            pathname: "/profile",
            query: { userid: id },
          })
        );
      }
    }
  );
});

export default authrouter;
