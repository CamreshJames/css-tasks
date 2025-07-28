// Basic form interactions for focus states and button effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const passwordToggle = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const signInBtn = document.querySelector('.sign-in-btn');

    // Enhanced focus effects for inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        // Add input animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });

    // Password visibility toggle with Boxicons
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('bx-show');
                this.classList.add('bx-hide');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('bx-hide');
                this.classList.add('bx-show');
            }
        });
    }

    // Sign in button click effect
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'translateY(2px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-1px)';
            }, 100);

            // Basic form validation feedback (visual only)
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                // Add shake animation to form
                const form = document.querySelector('.login-form');
                form.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            } else {
                // Success feedback
                this.textContent = 'Signing In...';
                this.style.background = '#27ae60';
                setTimeout(() => {
                    this.textContent = 'Sign In';
                    this.style.background = '#34495e';
                }, 2000);
            }
        });
    }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) translateX(0); }
        25% { transform: translate(-50%, -50%) translateX(-5px); }
        75% { transform: translate(-50%, -50%) translateX(5px); }
    }
    
    .input-group.focused input {
        border-color: #2ecc71;
        box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
    }
    
    .input-group input.has-content {
        background: #f8f9fa;
    }
`;
document.head.appendChild(style);