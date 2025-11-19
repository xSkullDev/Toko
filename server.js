const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Data pengguna (simulasi database)
const users = [
    { id: 1, username: 'admin', password: 'admin123', storeName: 'Toko Admin' },
    { id: 2, username: 'user', password: 'user123', storeName: 'Toko User' },
    { id: 3, username: 'toko1', password: 'password123', storeName: 'Toko Pertama' }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 24 jam
}));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('./public'));

// Routes

// 1. Home/Login Page
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { message: '' });
});

// 2. Handle Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.render('login', { message: 'Username dan password harus diisi' });
    }

    // Cari user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Login berhasil
        req.session.user = {
            id: user.id,
            username: user.username,
            storeName: user.storeName
        };
        return res.redirect('/dashboard');
    } else {
        // Login gagal
        return res.render('login', { message: 'Username atau password salah' });
    }
});

// 3. Dashboard Page
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const user = req.session.user;
    res.render('dashboard', { user });
});

// 4. Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Logout gagal');
        }
        res.redirect('/');
    });
});

// 5. API - Get user profile
app.get('/api/user', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Tidak ada user yang login' });
    }
    res.json(req.session.user);
});

// 6. Handle 404
app.use((req, res) => {
    res.status(404).render('404', { url: req.url });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Tekan Ctrl+C untuk menghentikan server`);
});
