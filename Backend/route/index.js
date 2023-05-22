import { Router } from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename).replace("/Backend", "");
console.log(__filename);
console.log(__dirname);

router.get("/dashboard/grading", (req, res) => {
  const filePath = path.join(__dirname,"../Frontend/Gradingpage/Test Grade/index.html");
  res.sendFile(filePath);
});

router.get("/dashboard", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Dashboard/index.html");
  res.sendFile(filePath);
});

router.get("/register", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signup/index.html");
  res.sendFile(filePath);
});

router.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});

router.get("/dashboard/Grading", (req, res) => {
  res.sendFile(__dirname + "/financial-health.html");
});

router.get("/dashboard/Suggestions", (req, res) => {
  //Frontend/Suggestions/Test Suggestion/main.html
  const filePath = path.join(__dirname,"../Frontend/Suggestions/Test Suggestion/main.html");
  res.sendFile(filePath);
});

router.get("/dashboard/Personalized-jars", (req, res) => {
  //Frontend/9Jars-Moneymanagement/Personalized Jars/main.html
  const filePath = path.join(__dirname,"../Frontend/9Jars-Moneymanagement/Personalized Jars/main.html");
  res.sendFile(filePath);
});

router.get("/dashboard/Fixed-jars", (req, res) => {
  //
  const filePath = path.join(__dirname,"../Frontend/9Jars-Moneymanagement/Fixed Jars/test jar/index.html");
  res.sendFile(filePath);
});

router.get("/dashboard/Calculation", (req, res) => {
  //Frontend/Calculation/index.html
  const filePath = path.join(__dirname, "../Frontend/Calculation/index.html");
  res.sendFile(filePath);
});

router.get("/profile", (req, res) => {
  //Frontend/Personal Info/index.html
  const filePath = path.join(__dirname, "../Frontend/Personal Info/index.html");
  res.sendFile(filePath);
});

router.get("/dashboard/test-grading", (req, res) => {
  const filePath = path.join(__dirname,"../Frontend/Gradingpage/Test Grade/index.html");
  res.sendFile(filePath);
});

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});

export default router;
