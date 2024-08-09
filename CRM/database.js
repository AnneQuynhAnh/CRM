// database.js
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Use your MySQL root password
  database: "crm_vinadesign", // Update with your new database name
  port: 3306,
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

// Export the connection
module.exports = connection;
