import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.svg'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-[#1c3d2e] px-4 md:px-8 py-4 md:py-5">
      <div className="flex justify-between items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-base md:text-lg">
          <img src={logo} alt="Sauti ya Wakulima" className="h-7 w-7 md:h-8 md:w-8" />
          Sauti ya Wakulima
        </Link>

        <div className="hidden md:flex gap-6 text-sm text-gray-200">
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/#about">About</Link>
        </div>

        <div className="hidden md:flex gap-3 items-center text-sm">
          {isAuthenticated ? (
            <>
              {user.role === 'farmer' && (
                <Link to="/dashboard" className="text-white underline">My Listings</Link>
              )}
              <Link to="/orders" className="text-white underline">Orders</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-white underline">Admin</Link>
              )}
              <span className="text-white">{user.email}</span>
              <button onClick={logout} className="border border-gray-300 text-white px-4 py-2">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="border border-gray-300 text-white px-4 py-2">Log in</Link>
              <Link to="/register" className="bg-[#d9a441] text-[#1c3d2e] font-bold px-4 py-2">
                List your harvest
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-2 text-sm text-gray-200">
          <Link to="/#how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link to="/marketplace" onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>

          {isAuthenticated ? (
            <>
              {user.role === 'farmer' && (
                <Link to="/dashboard" className="text-white underline" onClick={() => setMenuOpen(false)}>My Listings</Link>
              )}
              <Link to="/orders" className="text-white underline" onClick={() => setMenuOpen(false)}>Orders</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-white underline" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <span className="text-white">{user.email}</span>
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="border border-gray-300 text-white px-4 py-2 self-start"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="border border-gray-300 text-white px-4 py-2 text-center" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
              <Link to="/register" className="bg-[#d9a441] text-[#1c3d2e] font-bold px-4 py-2 text-center" onClick={() => setMenuOpen(false)}>
                List your harvest
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar