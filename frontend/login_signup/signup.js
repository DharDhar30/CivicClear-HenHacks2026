const form = document.getElementById("signupForm");
const message = document.getElementById("message");

const API_BASE = "http://127.0.0.1:5001";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  try {
    const response = await fetch(`${API_BASE}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
      return;
    }

    message.textContent = data.message;

    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);

  } catch (error) {
    message.textContent = "Cannot connect to server.";
    console.error(error);
  }
});