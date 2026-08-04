import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Badge from '../components/ui/Badge'
import { getListing } from '../api/listings'
import { createOrder } from '../api/orders'
import { useAuth } from '../context/AuthContext'

function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [offerPrice, setOfferPrice] = useState('')
  const [harvestDate, setHarvestDate] = useState('')
  const [orderError, setOrderError] = useState('')
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    async function fetchListing() {
      setLoading(true)
      setError('')
      try {
        const data = await getListing(id)
        setListing(data)
        setOfferPrice(data.price_per_kg)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id])

  async function handleOrder(e) {
    e.preventDefault()
    setOrderError('')
    setOrderLoading(true)
    try {
      await createOrder({
        listing_id: Number(id),
        price_agreed: Number(offerPrice),
        harvest_date: harvestDate,
        status: 'pending',
      })
      setOrderSuccess(true)
    } catch (err) {
      setOrderError(err.message)
    } finally {
      setOrderLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-8 py-6 md:py-10 max-w-2xl">
        {loading && <p className="text-gray-500 text-sm">Loading listing...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {listing && (
          <>
            <div className="bg-[#2d6a4f] h-36 md:h-48 mb-6"></div>

            <h1 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">
              {listing.variety} &middot; {listing.acreage} acres
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              Asking price: KES {listing.price_per_kg} / kg
            </p>
            <p className="text-gray-500 text-xs mb-2">
              {listing.farmer_name || 'Unknown farmer'}
              {listing.farmer_location && ` · ${listing.farmer_location}`}
            </p>
            <Badge variant={listing.status === 'available' ? 'success' : 'danger'}>
              {listing.status}
            </Badge>

            <div className="mt-8 border-t pt-6">
              {!isAuthenticated && (
                <p className="text-sm text-gray-600">
                  Log in as a buyer to place an order on this listing.
                </p>
              )}

              {isAuthenticated && user.role !== 'buyer' && (
                <p className="text-sm text-gray-600">
                  Only buyers can place orders.
                </p>
              )}

              {isAuthenticated && user.role === 'buyer' && !orderSuccess && (
                <form onSubmit={handleOrder} className="space-y-4">
                  <h2 className="text-[#1c3d2e] font-bold text-sm">
                    Place an order for the whole listing
                  </h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Your offer (KES)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Harvest date</label>
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  {orderError && <p className="text-red-600 text-sm">{orderError}</p>}
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="w-full sm:w-auto bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-5 py-3 disabled:opacity-50"
                  >
                    {orderLoading ? 'Placing order...' : 'Place order'}
                  </button>
                </form>
              )}

              {orderSuccess && (
                <div>
                  <p className="text-green-700 text-sm mb-3">
                    Order placed successfully!
                  </p>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="text-sm underline text-[#1c3d2e]"
                  >
                    Back to Marketplace
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ListingDetail