import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

function ListingCard({ listing }) {
  const statusVariant = listing.status === 'available' ? 'success' : 'danger'

  return (
    <Link to={`/listings/${listing.id}`} className="bg-white border border-gray-200 block hover:shadow-md transition">
      <div className="bg-[#2d6a4f] h-32"></div>
      <div className="p-4">
        <p className="text-[#1c3d2e] font-bold text-sm">
          {listing.variety} &middot; {listing.tree_count} trees
        </p>
        <div className="mt-2">
          <Badge variant={statusVariant}>{listing.status}</Badge>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard