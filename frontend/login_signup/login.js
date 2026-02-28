const currentUser = localStorage.getItem("civicclear_current_user");

if (currentUser) {
  window.location.href = "../index.html";
}

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // get users from signup
  const users = JSON.parse(localStorage.getItem("civicclear_users") || "[]");

  // find matching user
  const foundUser = users.find(user =>
    user.email === email && user.password === password
  );

  if (!foundUser) {
    message.textContent = "Invalid email or password.";
    return;
  }

  message.textContent = "Login successful!";

  // save current logged-in user
  localStorage.setItem("civicclear_current_user", email);

  // redirect to main page
  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);

});