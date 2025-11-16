import React, { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

export default function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (email, remember) => {
    // Pada implementasi nyata, panggil API di sini.
    // Untuk demo, kita simpan sederhana.
    setUser({ email })
    if (remember) {
      try {
        localStorage.setItem('toko_user', JSON.stringify({ email }))
      } catch (e) {
        // ignore storage error
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('toko_user')
  }

  return (
    <div>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}
