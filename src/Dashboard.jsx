import React from 'react'

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="container">
      <div className="login-card">
        <div style={{ textAlign: 'center' }}>
          <h2>Selamat datang, {user.email}</h2>
          <p>Ini adalah dashboard sederhana.</p>
          <button className="login-btn" onClick={onLogout} style={{ marginTop: 20 }}>
            Keluar
          </button>
        </div>
      </div>
    </div>
  )
}
