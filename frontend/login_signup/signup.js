const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!email || !password || !confirmPassword) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("civicclear_users") || "[]");

  // prevent duplicate emails
  if (users.some(u => u.email === email)) {
    message.textContent = "This email is already registered. Please login.";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("civicclear_users", JSON.stringify(users));

  message.textContent = "Account created! Redirecting to login...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 900);
});