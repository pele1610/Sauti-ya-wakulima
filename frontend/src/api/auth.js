import apiClient from './client'

export function login(credentials) {
    return apiClient('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}

export function register(details) {
    return apiClient('/register', {
        method: 'POST',
        body: JSON.stringify(details),
    })
}