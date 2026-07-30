import apiClient from './client'

export function getListings(page = 1, perPage = 10) {
    return apiClient(`/listings?page=${page}&per_page=${perPage}`)
}

export function getListing(id) {
    return apiClient(`/listings/${id}`)
}

export function createListing(data) {
    return apiClient('/listings', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function updateListing(id, data) {
    return apiClient(`/listings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

export function deleteListing(id) {
    return apiClient(`/listings/${id}`, {
        method: 'DELETE',
    })
}