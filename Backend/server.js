import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
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
app.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});

app.post("/auth/login", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Dashboard/index.html");
  console.log(req.body);
  //todo check login
  const { email, password } = req.body;
  if (email === "email" && password === "password") res.redirect("/dashboard");
  else {
    res.status(401).json({ error: "email or password is incorrect." });
  }
});

// หน้า Sub page จากหน้าashboard
// Routes for the sub-pages of the dashboard

app.get('/dashboard/Grading', (req, res) => {
  res.sendFile(__dirname + '/financial-health.html');
});

app.get('/dashboard/Suggestions', (req, res) => {
//Frontend/Suggestions/Test Suggestion/main.html
  const filePath = path.join(__dirname, "../Frontend/Suggestions/Test Suggestion/main.html");
  res.sendFile(filePath);
});

app.get('/dashboard/Personalized-jars', (req, res) => {
//Frontend/9Jars-Moneymanagement/Personalized Jars/main.html
  const filePath = path.join(__dirname, "../Frontend/9Jars-Moneymanagement/Personalized Jars/main.html");
  res.sendFile(filePath);
});

app.get('/dashboard/Fixed-jars', (req, res) => {
//
  const filePath = path.join(__dirname, "../Frontend/9Jars-Moneymanagement/Fixed Jars/test jar/index.html");
  res.sendFile(filePath);
});

app.get('/dashboard/Calculation', (req, res) => {
  //Frontend/Calculation/index.html
  const filePath = path.join(__dirname, "../Frontend/Calculation/index.html");
  res.sendFile(filePath);
});

app.get('/dashboard/UserProfile', (req, res) => {
  //Frontend/Personal Info/index.html
  const filePath = path.join(__dirname, "../Frontend/Personal Info/index.html");
  res.sendFile(filePath);
});

app.get('/dashboard/test-grading', (req, res) =>{
  const filePath = path.join(__dirname, "../Frontend/Gradingpage/Test Grade/index.html");
  res.sendFile(filePath);
})
// ---------------------------------------------//
//Display lasted Grading lelvel
// Route for handling the POST request from the Grading page
  // const bodyParser = require('body-parser');
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());

app.post('/dashboard/grading', (req, res) => {
  const result = req.body.result; // Get the result from the request body
  // Do something with the result, e.g., save it to a database

  // Redirect the user back to the Dashboard page and pass the result as a query parameter
  res.redirect('/dashboard?result=' + result);
});

// Route for the Dashboard page
app.get('/dashboard', (req, res) => {
  const result = req.query.result; // Get the result from the query parameter
  res.render('dashboard', { result: result }); // Render the dashboard template with the result variable
});

// ---------------------------------------------//
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Signin/index.html");
  res.sendFile(filePath);
});
// Start the server and listen on a specific port, e.g., 3000
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
