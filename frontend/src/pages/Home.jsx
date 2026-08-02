import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ListingCard from '../components/listings/ListingCard'
import { getListings } from '../api/listings'
import { useAuth } from '../context/AuthContext'

function Home() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const [recentListings, setRecentListings] = useState([])

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  useEffect(() => {
    if (!isAuthenticated) return
    async function fetchRecent() {
      try {
        const data = await getListings(1, 20)
        setRecentListings(data.listings)
      } catch (err) {
        // fail silently on the homepage, not critical
      }
    }
    fetchRecent()
  }, [isAuthenticated])

  return (
    <div>
      <Navbar />

      <section className="bg-[#1c3d2e] px-4 md:px-8 py-10 md:py-16">
        <p className="text-[#d9a441] text-xs tracking-widest mb-3">
          AVOCADO MARKETPLACE &middot; KENYA
        </p>
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 max-w-xl">
          Every farmer deserves a fair price.
        </h1>
        <p className="text-gray-300 text-sm mb-6 max-w-md">
          Sauti ya Wakulima connects avocado farmers directly with buyers — real listings, transparent orders, no middlemen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/register" className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-5 py-3 text-center">
            I'm a Farmer
          </Link>
          <Link to="/register" className="border border-gray-300 text-white text-sm px-5 py-3 text-center">
            I'm a Buyer
          </Link>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#f4efe6] px-4 md:px-8 py-10 md:py-16">
        <h2 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">
          How it works
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Three steps, from harvest to sale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-[#d9a441] font-bold text-xs mb-2">01</p>
            <p className="text-[#1c3d2e] font-bold text-sm mb-1">
              List your harvest
            </p>
            <p className="text-gray-500 text-xs">
              Farmers post Hass or Fuerte listings with variety and tree count.
            </p>
          </div>

          <div>
            <p className="text-[#d9a441] font-bold text-xs mb-2">02</p>
            <p className="text-[#1c3d2e] font-bold text-sm mb-1">
              Buyers place orders
            </p>
            <p className="text-gray-500 text-xs">
              Buyers browse listings and order directly.
            </p>
          </div>

          <div>
            <p className="text-[#d9a441] font-bold text-xs mb-2">03</p>
            <p className="text-[#1c3d2e] font-bold text-sm mb-1">
              Settle on harvest day
            </p>
            <p className="text-gray-500 text-xs">
              Weight and price are recorded when the order completes.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#ece4d3] px-4 md:px-8 py-10 md:py-16">
        <h2 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-8">
          Built for how harvest actually works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6">
            <p className="text-[#1c3d2e] font-bold text-sm mb-2">
              Real listings, not guesswork
            </p>
            <p className="text-gray-500 text-xs">
              Farmers post tree count and variety, so buyers know exactly what's available.
            </p>
          </div>

          <div className="bg-white p-6">
            <p className="text-[#1c3d2e] font-bold text-sm mb-2">
              Transparent orders
            </p>
            <p className="text-gray-500 text-xs">
              Price, harvest date, and weight are recorded on every order.
            </p>
          </div>

          <div className="bg-white p-6">
            <p className="text-[#1c3d2e] font-bold text-sm mb-2">
              Direct to buyers
            </p>
            <p className="text-gray-500 text-xs">
              No middlemen between the farm and the sale.
            </p>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <section className="bg-[#f4efe6] px-4 md:px-8 py-10 md:py-16">
          <h2 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-8">
            Farms harvesting now
          </h2>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex-none w-48 md:w-64">
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#d9a441] px-4 md:px-8 py-8 md:py-10 text-center">
        <h2 className="text-[#1c3d2e] text-lg md:text-xl font-bold mb-4">
          Ready to sell at a fair price?
        </h2>
        <Link to="/register" className="bg-[#1c3d2e] text-white font-bold text-sm px-6 py-3 inline-block">
          List your first harvest
        </Link>
      </section>

      <Footer />
    </div>
  )
}

export default Home