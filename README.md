# Toko App - Login & Dashboard dengan NPM

Aplikasi web sederhana untuk login dan dashboard menggunakan Node.js, Express, dan EJS template engine.

## 📦 Struktur Folder

```
Toko/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Environment variables
├── views/                 # EJS templates
│   ├── login.ejs         # Login page
│   ├── dashboard.ejs     # Dashboard page
│   └── 404.ejs          # 404 error page
└── public/               # Static files
    ├── css/
    │   ├── style.css     # Login styling
    │   └── dashboard.css # Dashboard styling
    └── js/
        └── dashboard.js  # Dashboard scripts
```

## 🚀 Setup & Instalasi

### 1. Install Dependencies

```bash
npm install
```

Ini akan install:
- `express` - Web framework
- `ejs` - Template engine
- `express-session` - Session management
- `body-parser` - Parse request body
- `dotenv` - Environment variables
- `nodemon` - Auto-reload (dev dependency)

### 2. Jalankan Server

**Development mode (dengan auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 🔐 Login Credentials

Gunakan salah satu akun di bawah untuk login:

| Username | Password | Toko |
|----------|----------|------|
| admin | admin123 | Toko Admin |
| user | user123 | Toko User |
| toko1 | password123 | Toko Pertama |

## ✨ Fitur

✅ **Login Page**
- Form validasi username & password
- Error messages
- Session management
- Responsive design

✅ **Dashboard Page**
- Navbar dengan nama toko
- Tombol logout
- 6 kartu menu (Dashboard, Produk, Penjualan, Pelanggan, Pengaturan, Laporan)
- Statistik harian
- Protected page (redirect ke login jika tidak ada session)

✅ **API Endpoints**
- `GET /` - Login page
- `POST /login` - Handle login form
- `GET /dashboard` - Dashboard page (protected)
- `GET /logout` - Logout & destroy session
- `GET /api/user` - Get user profile (JSON API)

## 📝 File Configuration

### .env
```env
PORT=3000
SESSION_SECRET=your-secret-key-change-this
NODE_ENV=development
```

### package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🔧 Cara Kerja

1. User membuka `http://localhost:3000`
2. Halaman login (EJS template) ditampilkan
3. User input username dan password
4. Server validasi credentials dari array `users`
5. Jika valid, simpan session dan redirect ke `/dashboard`
6. Dashboard page menampilkan nama toko dari session
7. Click logout untuk destroy session dan kembali ke login

## 📚 Dependencies Explanation

| Package | Fungsi |
|---------|--------|
| express | Web framework untuk membuat server |
| ejs | Template engine untuk dynamic HTML |
| express-session | Middleware untuk session management |
| body-parser | Parse request body (form data) |
| dotenv | Load environment variables dari .env |
| nodemon | Auto-reload server saat ada perubahan file |

## 🛠️ Troubleshooting

**Error: Cannot find module 'express'**
```bash
npm install
```

**Port 3000 sudah terpakai?**
- Edit `PORT` di `.env`
- Atau gunakan port lain: `PORT=3001 npm start`

**Session tidak tersimpan?**
- Pastikan cookies enabled di browser
- Clear browser cache jika perlu

**Template tidak rendering?**
- Pastikan folder `views/` ada
- Pastikan file `.ejs` di folder `views/`

## 📖 Pembelajaran Lebih Lanjut

### Express Basics
- https://expressjs.com/
- http://expressjs.com/en/starter/hello-world.html

### EJS Template Engine
- https://ejs.co/
- https://ejs.co/#docs

### Express Session
- https://github.com/expressjs/session

## 🎯 Next Steps

Fitur yang bisa ditambahkan:
1. Database (MongoDB/PostgreSQL) untuk menyimpan user
2. Password hashing (bcrypt)
3. Email verification
4. Forgot password functionality
5. User registration
6. Product management
7. Sales reporting

---

**Happy coding! 🎉**
