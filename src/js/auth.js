// Auth handling
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${target}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Form handling
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const role = document.getElementById('login-role').value;

            try {
                // Here you would typically make an API call to your backend
                console.log('Login attempt:', { email, role });
                // Redirect based on role
                if (role === 'founder') {
                    window.location.href = 'founder-dashboard.html';
                } else {
                    window.location.href = 'incubator-dashboard.html';
                }
            } catch (error) {
                console.error('Login error:', error);
                // Show error message to user
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const role = document.getElementById('signup-role').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                console.log('Signup attempt:', { name, email, role });
                // Redirect based on role
                if (role === 'founder') {
                    window.location.href = 'founder-dashboard.html';
                } else {
                    window.location.href = 'incubator-dashboard.html';
                }
            } catch (error) {
                console.error('Signup error:', error);
                // Show error message to user
            }
        });
    }
});

// File upload handling for idea submissions
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        event.target.value = '';
        return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        event.target.value = '';
        return;
    }

    // Here you would typically:
    // 1. Upload the file to your server
    // 2. Show upload progress
    // 3. Handle the response
    console.log('File ready for upload:', file.name);
}

// Location-based filtering for incubators
function filterIncubators(location) {
    // This would be implemented in the incubator listing page
    // It would filter the displayed incubators based on the selected location
    console.log('Filtering incubators by location:', location);
}

// Initialize any tooltips or other UI elements
function initializeUI() {
    // Add any initialization code here
    console.log('UI initialized');
}

// Call initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUI);

// OAuth and Passphrase Functions
function handleGoogleLogin() {
    // Implement Google OAuth login
    console.log('Google login initiated');
    // Redirect to Google OAuth
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile';
}

function handleLinkedInLogin() {
    // Implement LinkedIn OAuth login
    console.log('LinkedIn login initiated');
    // Redirect to LinkedIn OAuth
    window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile r_emailaddress';
}

function handleGoogleSignup() {
    // Implement Google OAuth signup
    console.log('Google signup initiated');
    // Redirect to Google OAuth
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile';
}

function handleLinkedInSignup() {
    // Implement LinkedIn OAuth signup
    console.log('LinkedIn signup initiated');
    // Redirect to LinkedIn OAuth
    window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile r_emailaddress';
}

function togglePassphraseLogin() {
    const passphraseInput = document.querySelector('.passphrase-input');
    passphraseInput.style.display = passphraseInput.style.display === 'none' ? 'block' : 'none';
}

function togglePassphraseSignup() {
    const passphraseGenerator = document.querySelector('.passphrase-generator');
    passphraseGenerator.style.display = passphraseGenerator.style.display === 'none' ? 'block' : 'none';
    if (passphraseGenerator.style.display === 'block') {
        generateNewPassphrase();
    }
}

function generateNewPassphrase() {
    // Generate a secure passphrase
    const words = [
        'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'garden', 'house',
        'island', 'jungle', 'kitten', 'lemon', 'mountain', 'night', 'ocean', 'panda',
        'queen', 'river', 'sunset', 'tiger', 'umbrella', 'valley', 'water', 'xylophone',
        'yellow', 'zebra'
    ];
    
    const passphrase = Array.from({ length: 4 }, () => 
        words[Math.floor(Math.random() * words.length)]
    ).join('-');
    
    document.getElementById('generated-passphrase').value = passphrase;
}

function copyPassphrase() {
    const passphraseInput = document.getElementById('generated-passphrase');
    passphraseInput.select();
    document.execCommand('copy');
    
    // Show copied feedback
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = originalText;
    }, 2000);
}

function handlePassphraseLogin() {
    const passphrase = document.getElementById('passphrase').value;
    if (!passphrase) {
        alert('Please enter your passphrase');
        return;
    }
    
    // Here you would typically make an API call to verify the passphrase
    console.log('Passphrase login attempt:', passphrase);
    // Redirect to appropriate dashboard based on role
    const role = document.getElementById('login-role').value;
    if (role === 'founder') {
        window.location.href = 'founder-dashboard.html';
    } else {
        window.location.href = 'incubator-dashboard.html';
    }
} 
