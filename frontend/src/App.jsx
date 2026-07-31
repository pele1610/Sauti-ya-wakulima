import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import ListingDetail from './pages/ListingDetail'
import FarmerDashboard from './pages/FarmerDashboard'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/dashboard" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
          <Route
            path="/protected-test"
            element={
              <ProtectedRoute>
                <div className="p-6">You're authenticated 🎉</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App