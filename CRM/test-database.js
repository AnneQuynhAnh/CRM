const connection = require("./database");

connection.query(
  "SELECT DISTINCT product_name FROM pricefull",
  (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      process.exit(1);
    }
    console.log("Products fetched:", results);
    process.exit(0);
  }
);
