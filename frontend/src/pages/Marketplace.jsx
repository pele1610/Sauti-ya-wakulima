import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ListingCard from '../components/listings/ListingCard'
import Pagination from '../components/ui/Pagination'
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

      <div className="px-4 md:px-8 py-6 md:py-10">
        <h1 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">Marketplace</h1>
        <p className="text-gray-500 text-sm mb-8">
          Browse available avocado listings from farmers.
        </p>

        {loading && <p className="text-gray-500 text-sm">Loading listings...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Marketplace