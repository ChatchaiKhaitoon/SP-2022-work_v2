import { Router } from "express";
import db from "../db_connect.js";
import url from "url";
const authrouter = Router();

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

authrouter.post("/register", async (req, res) => {
  if (req.body == undefined)
    return res.status(401).json({ message: "expect payload to not be empty." });
  const { email, password } = req.body;

  db.query(
    `
    INSERT INTO Registration(User_Email, User_password)
    value(?,?); 
    SELECT 
      id 
    FROM Registration 
    ORDER BY id DESC 
    LIMIT 1;`,
    [email, password],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      const id = result[1][result[1].length - 1].id;

      res.redirect(
        url.format({
          pathname: "/profile",
          query: { userid: id },
        })
      );
    }
  );
});

export default authrouter;
