let myFont;
function preload() {
  myFont = loadFont("MINION-BOLD.OTF");
}

function setup() {
  createCanvas(400, 400);
  textFont(MyFont);
  textSize(32);
}

function draw() {
  background(220);
}

function loadFile(event) {
  const output = document.getElementById("profile-img");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
}

function toggleEdit(icon) {
  const profileName = document.getElementById("profile-name");
  profileName.contentEditable =
    profileName.contentEditable === "true" ? "false" : "true";
  profileName.focus();
  icon.classList.toggle("clicked");
}

function loadFile(event) {
  const output = document.getElementById("profile-img");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
}

function toggleEdit(icon) {
  const profileName = document.getElementById("profile-name");
  profileName.contentEditable =
    profileName.contentEditable === "true" ? "false" : "true";
  profileName.focus();
  icon.classList.toggle("clicked");
}
