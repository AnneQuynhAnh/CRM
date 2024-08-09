document.getElementById("menuButton").addEventListener("click", function () {
  this.classList.toggle("x");
  var menuContent = document.getElementById("menuContent");
  if (menuContent.style.display === "block") {
    menuContent.style.display = "none";
  } else {
    menuContent.style.display = "block";
  }
});
document.getElementById('search-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      var query = document.getElementById('search-input').value;
      alert('You searched for: ' + query);
  }
});