document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const emailConfirmationPopup = document.getElementById(
    "emailConfirmationPopup"
  );
  const closePopup = document.getElementById("closePopup");
  const confirmButton = document.getElementById("confirmButton");

  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      const result = await response.text();

      if (response.ok) {
        alert(result);
        emailConfirmationPopup.style.display = "flex"; // Show the popup
        document.body.classList.add("popup-active"); // Add class to hide the container
      } else {
        alert(result);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred. Please try again.");
    }
  });

  closePopup.addEventListener("click", function () {
    emailConfirmationPopup.style.display = "none"; // Hide the popup
    document.body.classList.remove("popup-active"); // Remove class to show the container
  });

  confirmButton.addEventListener("click", function () {
    emailConfirmationPopup.style.display = "none"; // Hide the popup
    document.body.classList.remove("popup-active"); // Remove class to show the container
    window.location.href = "../HTML/signin.html"; // Redirect to sign in page
  });

  window.addEventListener("click", function (event) {
    if (event.target == emailConfirmationPopup) {
      emailConfirmationPopup.style.display = "none"; // Hide the popup if user clicks outside of it
      document.body.classList.remove("popup-active"); // Remove class to show the container
    }
  });
});
