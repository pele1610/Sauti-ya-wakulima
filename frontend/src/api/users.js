import apiClient from './client'

export function getUsers(role) {
    const query = role ? `?role=${role}` : ''
    return apiClient(`/users${query}`)
}