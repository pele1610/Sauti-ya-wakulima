import Badge from '../ui/Badge'

const statusVariant = {
  pending: 'warning',
  confirmed: 'default',
  completed: 'success',
}

function OrderCard({ order }) {
  return (
    <div className="flex justify-between items-center bg-white border p-4">
      <div>
        <p className="font-bold text-sm text-[#1c3d2e]">
          {order.listing?.variety} ({order.weight_recorded} kg)
        </p>
        <p className="text-gray-500 text-xs">
          KES {order.price_agreed} &nbsp;|&nbsp; Harvest: {order.harvest_date}
        </p>
      </div>
      <Badge variant={statusVariant[order.status] || 'default'}>
        {order.status}
      </Badge>
    </div>
  )
}

export default OrderCard
