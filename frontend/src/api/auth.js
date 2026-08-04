import apiClient from './client'

export function register({ name, email, password, role, location }) {
    return apiClient('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role, location }),
    })
}

export function login({ email, password }) {
    return apiClient('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}