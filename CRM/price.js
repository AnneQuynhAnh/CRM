// price.js
const connection = require("./database");

// Example function to fetch all records from 'pricefull'
function fetchAllRecords() {
  connection.query("SELECT * FROM pricefull", (error, results, fields) => {
    if (error) {
      console.error("Error executing query:", error.stack);
      return;
    }
    console.log("Results:", results);
  });
}

// Call the function or export it
fetchAllRecords();
