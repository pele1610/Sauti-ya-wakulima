import apiClient from './client'

export function register({ email, password, role }) {
    return apiClient('/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
    })
}

export function login({ email, password }) {
    return apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}