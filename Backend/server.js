import express from "express";
import router from "./route/index.js";
import apirouter from "./api/api.js";
import authrouter from "./api/auth.js";
// Import required modules

//MySQL Connection

// Create an Express app
const app = express();
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use(express.static("../Frontend/public", { type: "text/css" }));

// Listen for requests at the root path and send the index.html file as a response

app.use("/", router);
app.use("/api", apirouter);
app.use("/auth", authrouter);


// ---------------------------------------------//

// Start the server and listen on a specific port, e.g., 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
