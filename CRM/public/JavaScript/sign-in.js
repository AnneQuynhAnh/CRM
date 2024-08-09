document.addEventListener("DOMContentLoaded", function () {
  const signinForm = document.getElementById("signinForm");

  signinForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    window.location.href = "../HTML/home.html"; // Redirect to home.html
  });
});
