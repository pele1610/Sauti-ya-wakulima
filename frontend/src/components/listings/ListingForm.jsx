import { useState } from 'react'

function ListingForm({ onSubmit, onCancel }) {
  const [variety, setVariety] = useState('Hass')
  const [acreage, setAcreage] = useState('')
  const [pricePerKg, setPricePerKg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        variety,
        acreage: Number(acreage),
        price_per_kg: Number(pricePerKg),
        status: 'available',
      })
      setAcreage('')
      setPricePerKg('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-6 mb-8 max-w-sm space-y-4">
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
          step="0.01"
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
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1c3d2e] text-white font-bold text-sm px-4 py-2 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm text-gray-500 underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ListingForm