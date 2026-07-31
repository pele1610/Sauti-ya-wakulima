import apiClient from './client'

export function getListingsBuyerCount() {
    return apiClient('/analytics/listings-buyer-count')
}

export function getAvgTreeCountByVariety() {
    return apiClient('/analytics/avg-tree-count-by-variety')
}

export function getOrdersByStatus(status = 'completed') {
    return apiClient(`/analytics/orders-by-status?status=${status}`)
}