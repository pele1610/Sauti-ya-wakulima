import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Badge from '../components/ui/Badge'
import { getListings, deleteListing } from '../api/listings'

function AdminPanel() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchListings() {
    setLoading(true)
    setError('')
    try {
      const data = await getListings(1, 50)
      setListings(data.listings)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  async function handleRemove(id) {
    try {
      await deleteListing(id)
      fetchListings()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-[#1c3d2e] text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-gray-500 text-sm mb-8">
          Review and remove listings that violate platform rules.
        </p>

        {loading && <p className="text-gray-500 text-sm">Loading listings...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col gap-3">
            {listings.length === 0 && (
              <p className="text-gray-500 text-sm">No listings found.</p>
            )}
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="flex justify-between items-center bg-white border p-4"
              >
                <div>
                  <p className="font-bold text-sm text-[#1c3d2e]">
                    {listing.variety} &middot; {listing.tree_count} trees
                  </p>
                  <p className="text-gray-500 text-xs">
                    Farmer ID: {listing.farmer_id}
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
        )}
      </div>

      <Footer />
    </div>
  )
}

export default AdminPanel