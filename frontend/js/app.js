// Show Login Form
function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");

    const tabs = document.querySelectorAll(".tab-btn");
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
}

// Show Signup Form
function showSignup() {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");

    const tabs = document.querySelectorAll(".tab-btn");
    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");
}

// Toggle Password Visibility
function togglePass(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// Login Redirect Logic
function handleLogin() {
    // (Optional) You can add validation here later

    // Redirect to home page
    window.location.href = "index.html";
}
