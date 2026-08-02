import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import { getOrders, updateOrder } from '../api/orders'
import { useAuth } from '../context/AuthContext'

const statusVariant = {
  pending: 'warning',
  confirmed: 'default',
  completed: 'success',
}

function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      setError('')
      try {
        const data = await getOrders(page, 10)
        setOrders(data.orders)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [page])

  async function handleStatusChange(orderId, newStatus) {
    try {
      await updateOrder(orderId, { status: newStatus })
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-8 py-6 md:py-10">
        <h1 className="text-[#1c3d2e] text-xl md:text-2xl font-bold mb-1">
          {user.role === 'farmer' ? 'Orders on your listings' : 'Your orders'}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {user.role === 'farmer'
            ? 'Orders buyers have placed on your listings.'
            : 'Your order history and current requests.'}
        </p>

        {loading && <p className="text-gray-500 text-sm">Loading orders...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex flex-col gap-3 mb-8">
              {orders.length === 0 && (
                <p className="text-gray-500 text-sm">No orders yet.</p>
              )}
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-white border p-4"
                >
                  <div>
                    <p className="font-bold text-sm text-[#1c3d2e]">
                      {order.listing?.variety} ({order.weight_recorded} kg)
                    </p>
                    <p className="text-gray-500 text-xs">
                      KES {order.price_agreed} &nbsp;|&nbsp; Harvest: {order.harvest_date}
                    </p>
                  </div>
                  {user.role === 'farmer' ? (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-xs border rounded px-2 py-1 self-start sm:self-auto"
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="completed">completed</option>
                    </select>
                  ) : (
                    <Badge variant={statusVariant[order.status] || 'default'}>
                      {order.status}
                    </Badge>
                  )}
                </div>
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

export default Orders