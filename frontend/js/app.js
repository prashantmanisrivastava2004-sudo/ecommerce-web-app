function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");

    const tabs = document.querySelectorAll(".tab-btn");
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
}

function showSignup() {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");

    const tabs = document.querySelectorAll(".tab-btn");
    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");
}

function togglePass(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

function handleLogin() {
    // Get input values
    const email = document.querySelector('#loginForm input[type="email"]').value.trim();
    const password = document.getElementById("loginPass").value.trim();

    // Validation
    if (email === "" || password === "") {
        alert("Please enter both email and password");
        return; // stop execution
    }

    // If validation passes → redirect
    window.location.href = "index.html";
}
