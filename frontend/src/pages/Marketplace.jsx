import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import ListingCard from '../components/listings/ListingCard'
import { getListings } from '../api/listings'

function Marketplace() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      setError('')
      try {
        const data = await getListings(page, 6)
        setListings(data.listings)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [page])

  return (
    <div>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-[#1c3d2e] text-2xl font-bold mb-1">Marketplace</h1>
        <p className="text-gray-500 text-sm mb-8">
          Browse available avocado listings from farmers.
        </p>

        {loading && <p className="text-gray-500 text-sm">Loading listings...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="flex justify-center gap-4 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border disabled:opacity-40"
              >
                Prev
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Marketplace