// ===============================
// FORM SWITCHING (LOGIN PAGE)
// ===============================
function setActive(id, title) {
  document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");

  const titleEl = document.getElementById("formTitle");
  if (titleEl) titleEl.innerText = title;
}

function showLogin() { setActive("loginForm", "Welcome Back"); }
function showRegister() { setActive("registerForm", "Create Account"); }
function showForgot() { setActive("forgotForm", "Forgot Password"); }
function showReset() { setActive("resetForm", "Reset Password"); }

// ===============================
// LOGIN (FRONTEND ONLY)
// ===============================
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (user !== "" && pass !== "") {
    localStorage.setItem("user", user);

    // redirect to choice page
    window.location.href = "pages/choice.html";
  } else {
    alert("Please enter both fields");
  }
}

// ===============================
// REGISTER (FRONTEND ONLY)
// ===============================
function register() {
  const name = document.getElementById("regName").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (name && mobile && pass) {
    alert("Registered successfully!");
    showLogin();
  } else {
    alert("Fill all fields");
  }
}

// ===============================
// OTP FLOW (DEMO)
// ===============================
function sendOTP() {
  const mobile = document.getElementById("forgotMobile").value.trim();
  if (mobile) {
    alert("OTP sent (demo)");
    showReset();
  } else {
    alert("Enter mobile number");
  }
}

function resetPassword() {
  const pass = document.getElementById("newPass").value.trim();
  if (pass) {
    alert("Password reset successful!");
    showLogin();
  } else {
    alert("Enter new password");
  }
}

// ===============================
// NAVIGATION (CHOICE PAGE)
// ===============================
function goGrab() {
  window.location.href = "grab.html";
}

function goDrop() {
  window.location.href = "drop.html";
}