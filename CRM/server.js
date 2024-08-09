const express = require("express");
const path = require("path");
const connection = require("./database");
const app = express();
const port = 3007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' folder

// Endpoint to get all products
app.get("/products", (req, res) => {
  const query = "SELECT DISTINCT product_name FROM pricefull";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Error fetching products" });
      return;
    }
    res.json(results);
  });
});

// Endpoint to get product specifications
app.get("/product-specifications", (req, res) => {
  const productName = req.query.productName;
  console.log("Product Name received:", productName); // Log for debugging
  const query =
    "SELECT DISTINCT product_specification FROM pricefull WHERE product_name = ?";
  connection.query(query, [productName], (err, results) => {
    if (err) {
      console.error("Error fetching product specifications:", err);
      res.status(500).json({ error: "Error fetching product specifications" });
      return;
    }
    console.log("Specifications fetched:", results); // Log for debugging
    res.json(results);
  });
});

// Endpoint to get product price based on product name and specification
app.get("/product-price", (req, res) => {
  const { productName, productSpecification } = req.query;
  const query =
    "SELECT price_perm2 FROM pricefull WHERE product_name = ? AND product_specification = ?";
  connection.query(
    query,
    [productName, productSpecification],
    (err, results) => {
      if (err) {
        console.error("Error fetching product price:", err);
        res.status(500).json({ error: "Error fetching product price" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Product price not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});
// Endpoint to get max_side and extra_supply
app.get("/product-max-side", (req, res) => {
  const productName = req.query.productName;
  console.log("Fetching max side for product:", productName); // Log for debugging
  const query =
    "SELECT max_side, extra_supply FROM pricefull WHERE product_name = ?";

  connection.query(query, [productName], (error, results) => {
    if (error) {
      console.error("Error fetching max side:", error); // Log error
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      console.log("Product not found:", productName); // Log not found
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Max side and extra supply fetched:", results[0]); // Log results
    res.json(results[0]);
  });
});
// Endpoint to handle sign-up form submission
app.post("/signup", (req, res) => {
  const { fullname, email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    if (results.length > 0) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Insert new user into the database
    const insertUserQuery =
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    connection.query(
      insertUserQuery,
      [fullname, email, password],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          res.status(500).json({ error: "Server error" });
          return;
        }
        res.json({ message: "User registered successfully" });
      }
    );
  });
});

// Endpoint to create a new order
app.post("/create-order", (req, res) => {
  const orderData = req.body;
  console.log("Received order data:", orderData); // Log received data

  // Ensure productDetails is correctly processed as JSON
  let productDetailsJSON;
  try {
    productDetailsJSON = JSON.stringify(orderData.productDetails);
    console.log("Product details JSON:", productDetailsJSON); // Log JSON string
  } catch (error) {
    console.error("Error stringifying product details:", error);
    res.status(500).json({ error: "Error processing product details" });
    return;
  }

  const sql = `INSERT INTO customer_order 
               (staff_name, designer, customer_name, phone_no, payment_method, delivery_method, discount, amount_to_pay, note, product_details) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    orderData.staffName,
    orderData.designer,
    orderData.customerName,
    orderData.phoneNo,
    orderData.paymentMethod,
    orderData.deliveryMethod,
    orderData.discount,
    orderData.amountToPay,
    orderData.note,
    productDetailsJSON, // Use JSON string for insertion
  ];

  console.log("SQL query values:", values); // Log query values

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting order:", err);
      res.status(500).json({ error: "Error inserting order" }); // Return JSON error
      return;
    }
    console.log("Order created successfully:", result);
    res.json({
      message: "Order created successfully",
      order_id: result.insertId,
    }); // Return JSON response
  });
});

// Endpoint to add a cart item
app.post("/add-cart-item", (req, res) => {
  const cartItemData = req.body;
  console.log("Received cart item data:", cartItemData); // Log received data

  const sql = `INSERT INTO cart_items 
               (product_name, product_specification, total_money, note, order_id) 
               VALUES (?, ?, ?, ?, ?)`;

  const values = [
    cartItemData.productName,
    cartItemData.productSpecification,
    cartItemData.totalMoney,
    cartItemData.note,
    cartItemData.orderId,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting cart item:", err);
      res.status(500).json({ error: "Error inserting cart item" }); // Return JSON error
      return;
    }
    res.json({ message: "Cart item added successfully" }); // Return JSON response
  });
});

// Serve the sign-up page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HTML", "signup.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
