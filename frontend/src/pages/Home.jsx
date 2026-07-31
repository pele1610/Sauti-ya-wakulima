import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { getListings } from '../api/listings'
import ListingCard from '../components/listings/ListingCard'

function Home() {
  const location = useLocation()
  const [recentListings, setRecentListings] = useState([])

  useEffect(() => {
    async function fetchRecent() {
      try {
        const data = await getListings(1, 3)
        setRecentListings(data.listings)
      } catch (err) {
        // fail silently on the homepage, not critical
      }
    }
    fetchRecent()
  }, [])
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <div>
      <Navbar />

      <section className="bg-[#1c3d2e] px-8 py-16">
        <p className="text-[#d9a441] text-xs tracking-widest mb-3">
          AVOCADO MARKETPLACE &middot; KENYA
        </p>
        <h1 className="text-white text-4xl font-bold mb-4 max-w-xl">
          Every harvest deserves a fair price.
        </h1>
        <p className="text-gray-300 text-sm mb-6 max-w-md">
          Sauti ya Wakulima connects avocado farmers directly with buyers — real listings, transparent orders, no middlemen.
        </p>
        <div className="flex gap-3">
          <Link to="/register" className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-5 py-3">
            I'm a Farmer
          </Link>
          <Link to="/register" className="border border-gray-300 text-white text-sm px-5 py-3">
            I'm a Buyer
          </Link>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#f4efe6] px-8 py-16">
        <h2 className="text-[#1c3d2e] text-2xl font-bold mb-1">
          How it works
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Three steps, from harvest to sale.
        </p>

        <div className="grid grid-cols-3 gap-8">
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

      <section id="about" className="bg-[#ece4d3] px-8 py-16">
        <h2 className="text-[#1c3d2e] text-2xl font-bold mb-8">
          Built for how harvest actually works
        </h2>

        <div className="grid grid-cols-3 gap-6">
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

     <section className="bg-[#f4efe6] px-8 py-16">
        <h2 className="text-[#1c3d2e] text-2xl font-bold mb-8">
          Farms harvesting now
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="bg-[#d9a441] px-8 py-10 text-center">
        <h2 className="text-[#1c3d2e] text-xl font-bold mb-4">
          Ready to sell at a fair price?
        </h2>
        <Link to="/register" className="bg-[#1c3d2e] text-white font-bold text-sm px-6 py-3">
          List your first harvest
        </Link>
      </section>

      <Footer />

    </div>
  )
}

export default Home