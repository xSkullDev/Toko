import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Mohon isi email dan password')
      return
    }

    // Demo: terima semua kombinasi
    onLogin(email, remember)
  }

  return (
    <div className="container">
      <div className="login-card">
        <div className="login-header">
          <h1>Toko</h1>
          <p>Masuk ke akun Anda</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
            <button type="button" className="linkish" onClick={() => alert('Fitur lupa password belum tersedia')}>
              Lupa password?
            </button>
          </div>

          <button type="submit" className="login-btn">Masuk</button>

          <div className="signup-link">
            Belum punya akun? <button type="button" className="linkish" onClick={() => alert('Fitur daftar belum tersedia')}>Daftar sekarang</button>
          </div>
        </form>
      </div>
    </div>
  )
}
