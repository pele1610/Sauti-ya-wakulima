import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Badge from '../components/ui/Badge'
import { getListings, createListing, deleteListing } from '../api/listings'
import { useAuth } from '../context/AuthContext'

function FarmerDashboard() {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [variety, setVariety] = useState('Hass')
  const [acreage, setAcreage] = useState('')
  const [pricePerKg, setPricePerKg] = useState('')
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  async function fetchMyListings() {
    setLoading(true)
    setError('')
    try {
      const data = await getListings(1, 50)
      const mine = data.listings.filter((l) => l.farmer_id === Number(user.id))
      setListings(mine)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyListings()
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    setFormError('')
    setFormLoading(true)
    try {
      await createListing({
        variety,
        acreage: Number(acreage),
        price_per_kg: Number(pricePerKg),
        status: 'available',
      })
      setAcreage('')
      setPricePerKg('')
      setShowForm(false)
      fetchMyListings()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteListing(id)
      fetchMyListings()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-8 py-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
          <div>
            <h1 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">My Listings</h1>
            <p className="text-gray-500 text-sm">{listings.length} listing(s)</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-4 py-2 self-start"
          >
            {showForm ? 'Cancel' : 'Add Listing'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white border p-6 mb-8 max-w-sm space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Variety</label>
              <select
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Hass">Hass</option>
                <option value="Fuerte">Fuerte</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Acreage</label>
              <input
                type="number"
                step="0.1"
                value={acreage}
                onChange={(e) => setAcreage(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per kg (KES)</label>
              <input
                type="number"
                step="0.01"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            {formError && <p className="text-red-600 text-sm">{formError}</p>}
            <button
              type="submit"
              disabled={formLoading}
              className="bg-[#1c3d2e] text-white font-bold text-sm px-4 py-2 disabled:opacity-50"
            >
              {formLoading ? 'Creating...' : 'Create Listing'}
            </button>
          </form>
        )}

        {loading && <p className="text-gray-500 text-sm">Loading your listings...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col gap-3">
            {listings.length === 0 && (
              <p className="text-gray-500 text-sm">You haven't posted any listings yet.</p>
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
                  <p className="text-gray-500 text-xs">KES {listing.price_per_kg} / kg</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={listing.status === 'available' ? 'success' : 'danger'}>
                    {listing.status}
                  </Badge>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="text-red-600 text-sm underline"
                  >
                    Delete
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

export default FarmerDashboard