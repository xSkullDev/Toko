// Data pengguna yang tersimpan (simulasi database)
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
    { username: 'toko1', password: 'password123' }
];

// Elemen DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const messageDiv = document.getElementById('message');
const signupLink = document.getElementById('signupLink');

// Check if user already logged in
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('loggedInUser');
    if (savedUsername) {
        window.location.href = 'dashboard.html';
    }

    // Restore username if "Remember me" was checked
    const savedUsernameForRemember = localStorage.getItem('rememberedUsername');
    if (savedUsernameForRemember) {
        usernameInput.value = savedUsernameForRemember;
        rememberCheckbox.checked = true;
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate input
    if (!username || !password) {
        showMessage('Username dan password tidak boleh kosong', 'error');
        return;
    }

    // Check credentials
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Login berhasil
        showMessage('✓ Login berhasil! Mengalihkan...', 'success');
        
        // Simpan username ke localStorage
        localStorage.setItem('loggedInUser', username);

        // Handle remember me
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }

        // Redirect ke dashboard setelah 1 detik
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // Login gagal
        showMessage('✗ Username atau password salah', 'error');
        passwordInput.value = '';
    }
});

// Handle signup link
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Fitur Signup belum tersedia. Gunakan:\nUsername: admin\nPassword: admin123\n\nAtau:\nUsername: user\nPassword: user123\n\nAtau:\nUsername: toko1\nPassword: password123');
});

// Show message function
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message show ${type}`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}
