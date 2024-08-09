<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  // Process the email, send a confirmation email, etc.
  // After processing, redirect to the confirmation page
  header("Location: request-confirmation.html");
  exit();
}
?>
