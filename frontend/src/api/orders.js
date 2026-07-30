import apiClient from './client'

export function getOrders(page = 1, perPage = 10) {
    return apiClient(`/orders?page=${page}&per_page=${perPage}`)
}

export function getOrder(id) {
    return apiClient(`/orders/${id}`)
}

export function createOrder(data) {
    return apiClient('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function updateOrder(id, data) {
    return apiClient(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

export function deleteOrder(id) {
    return apiClient(`/orders/${id}`, {
        method: 'DELETE',
    })
}