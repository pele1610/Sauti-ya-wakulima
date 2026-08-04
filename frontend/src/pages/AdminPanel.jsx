import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Badge from '../components/ui/Badge'
import { getListings, deleteListing } from '../api/listings'
import { getUsers } from '../api/users'

function AdminPanel() {
  const [listings, setListings] = useState([])
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchAll() {
    setLoading(true)
    setError('')
    try {
      const [listingsData, farmersData] = await Promise.all([
        getListings(1, 50),
        getUsers('farmer'),
      ])
      setListings(listingsData.listings)
      setFarmers(farmersData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function handleRemove(id) {
    try {
      await deleteListing(id)
      fetchAll()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-8 py-6 md:py-10">
        <h1 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-gray-500 text-sm mb-8">
          Review listings and see registered farmers.
        </p>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            <h2 className="text-[#1c3d2e] font-bold text-sm mb-3">
              Registered Farmers ({farmers.length})
            </h2>
            <div className="flex flex-col gap-2 mb-10">
              {farmers.length === 0 && (
                <p className="text-gray-500 text-sm">No farmers registered yet.</p>
              )}
              {farmers.map((farmer) => (
                <div key={farmer.id} className="bg-white border p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-[#1c3d2e]">{farmer.name || 'Unnamed'}</p>
                    <p className="text-gray-500 text-xs">{farmer.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-[#1c3d2e] font-bold text-sm mb-3">Listings</h2>
            <div className="flex flex-col gap-3">
              {listings.length === 0 && (
                <p className="text-gray-500 text-sm">No listings found.</p>
              )}
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-white border p-4"
                >
                  <div>
                    <p className="font-bold text-sm text-[#1c3d2e]">
                      {listing.variety} &middot; {listing.acreage} acres
                    </p>
                    <p className="text-gray-500 text-xs">
                      {listing.farmer_name || 'Unknown farmer'} &middot; KES {listing.price_per_kg}/kg
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={listing.status === 'available' ? 'success' : 'danger'}>
                      {listing.status}
                    </Badge>
                    <button
                      onClick={() => handleRemove(listing.id)}
                      className="text-red-600 text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default AdminPanel