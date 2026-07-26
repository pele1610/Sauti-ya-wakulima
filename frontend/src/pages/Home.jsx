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
    </div>
  )
}

export default Home