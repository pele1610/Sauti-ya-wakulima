import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-[#1c3d2e] px-8 py-5 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-lg">Sauti ya Wakulima</Link>
      <div className="flex gap-6 text-sm text-gray-200">
        <span>How it works</span>
        <Link to="/marketplace">Marketplace</Link>
        <span>About</span>
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