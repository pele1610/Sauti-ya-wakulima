function Home() {
  return (
    <div>
      <nav className="bg-[#1c3d2e] px-8 py-5 flex justify-between items-center">
        <span className="text-white font-bold text-lg">Sauti ya Wakulima</span>
        <div className="flex gap-6 text-sm text-gray-200">
          <span>How it works</span>
          <span>Marketplace</span>
          <span>About</span>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-300 text-white text-sm px-4 py-2">
            Log in
          </button>
          <button className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-4 py-2">
            List your harvest
          </button>
        </div>
      </nav>

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
          <button className="bg-[#d9a441] text-[#1c3d2e] font-bold text-sm px-5 py-3">
            I'm a Farmer
          </button>
          <button className="border border-gray-300 text-white text-sm px-5 py-3">
            I'm a Buyer
          </button>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-8 py-16">
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
      <section className="bg-[#ece4d3] px-8 py-16">
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
          <div className="bg-white">
            <div className="bg-[#2d6a4f] h-32"></div>
            <div className="p-4">
              <p className="text-[#1c3d2e] font-bold text-sm">Hass &middot; 84 trees</p>
              <p className="text-gray-500 text-xs mb-2">Kericho County</p>
              <p className="text-[#1c3d2e] font-bold text-sm">KES 38 / kg</p>
            </div>
          </div>

          <div className="bg-white">
            <div className="bg-[#2d6a4f] h-32"></div>
            <div className="p-4">
              <p className="text-[#1c3d2e] font-bold text-sm">Fuerte &middot; 52 trees</p>
              <p className="text-gray-500 text-xs mb-2">Kericho County</p>
              <p className="text-[#1c3d2e] font-bold text-sm">KES 31 / kg</p>
            </div>
          </div>

          <div className="bg-white">
            <div className="bg-[#2d6a4f] h-32"></div>
            <div className="p-4">
              <p className="text-[#1c3d2e] font-bold text-sm">Hass &middot; 120 trees</p>
              <p className="text-gray-500 text-xs mb-2">Bomet County</p>
              <p className="text-[#1c3d2e] font-bold text-sm">KES 40 / kg</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#d9a441] px-8 py-10 text-center">
        <h2 className="text-[#1c3d2e] text-xl font-bold mb-4">
          Ready to sell at a fair price?
        </h2>
        <button className="bg-[#1c3d2e] text-white font-bold text-sm px-6 py-3">
          List your first harvest
        </button>
      </section>

      <footer className="bg-[#1c3d2e] px-8 py-6 flex justify-between items-center">
        <span className="text-white font-bold text-sm">Sauti ya Wakulima</span>
        <span className="text-gray-400 text-xs">
          Built for farmers and buyers across Kenya. Avocado marketplace, V1.
        </span>
      </footer>

    </div>
  )
}

export default Home