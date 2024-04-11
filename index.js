const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from a .env file
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const routes = require("./startup/routes");

const app = express();

const port = process.env.PORT || 3500;
const mySqlConnection = require("./config/mysqlConnect");

// Middleware for parsing request bodies and enabling CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "200mb", extended: true }));
app.use(cors());

app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  console.log(`|Full-URL,  Request-Type|   ::   |${fullUrl},  ${req.method}|`);
  next();
});

// Define a route for the root URL
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to WebApis.");
});

mySqlConnection
  .authenticate()
  .then(async () => {
    try {
      console.log("Database connection established successfully");
      // await mySqlConnection.sync();
      await mySqlConnection.sync({ force: false }); // // if true, this will create the table(s) if they don't exist. Use with caution, as it drops existing tables.

      console.log("Models synced successfully.");
      // Start the Express server
      app.listen(port, () => {
        console.log(`Secure Server listening on port ${port}`);
        routes(app);

      });

    } catch (error) {
      console.error("Database connection error:", error.message);
      console.error(error);
    }
  })
  .catch((err) => {
    console.log("Following error occurred");
    console.log(err.message);
    console.log(err);
  });
