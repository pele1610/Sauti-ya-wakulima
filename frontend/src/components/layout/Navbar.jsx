import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.svg'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <nav className="bg-[#1c3d2e] px-8 py-5 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
        <img src={logo} alt="Sauti ya Wakulima logo" className="w-8 h-8" />
        Sauti ya Wakulima
      </Link>
      <div className="flex gap-6 text-sm text-gray-200">
        <Link to="/#how-it-works">How it works</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/#about">About</Link>
      </div>
      <div className="flex gap-3 items-center">
        {isAuthenticated ? (
          <>
            {user.role === 'farmer' && (
              <Link to="/dashboard" className="text-white text-sm underline">
                My Listings
              </Link>
            )}
            <Link to="/orders" className="text-white text-sm underline">
              Orders
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-white text-sm underline">
                Admin
              </Link>
            )}
            <span className="text-white text-sm">{user.email}</span>
            <button onClick={logout} className="border border-gray-300 text-white text-sm px-4 py-2">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="border border-gray-300 text-white text-sm px-4 py-2">
              Log in
            </Link>
            <Link to="/register" className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-4 py-2">
              List your harvest
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar