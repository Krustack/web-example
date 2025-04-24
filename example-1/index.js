// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const closeBtns = document.getElementsByClassName('close');

    // Open login modal
    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    // Open register modal
    registerBtn.onclick = function() {
        registerModal.style.display = "block";
    }

    // Close modals when clicking (x)
    Array.from(closeBtns).forEach(btn => {
        btn.onclick = function() {
            loginModal.style.display = "none";
            registerModal.style.display = "none";
        }
    });

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
    }

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        console.log('Login attempt:', { email, password });
        // Add your login logic here
        
        loginModal.style.display = "none";
        this.reset();
    });

    // Handle register form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        console.log('Register attempt:', { email, password });
        // Add your registration logic here
        
        registerModal.style.display = "none";
        this.reset();
    });

    // Add smooth scroll for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
