const API_BASE = "http://127.0.0.1:5001";

// if already logged in, go to dashboard
const currentUser = localStorage.getItem("civicclear_current_user");
if (currentUser) {
  window.location.href = "../index.html";
}

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
      return;
    }

    message.textContent = data.message;

    // save login session
    localStorage.setItem("civicclear_current_user", email);

    // redirect to dashboard
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);

  } catch (error) {
    message.textContent = "Cannot connect to server.";
    console.error(error);
  }
});