import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

axios.defaults.withCredentials = true

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='))
        ?.split('=')[1]
}

export async function login(username, password) {
    const response = await axios.post(
        `${API_URL}/accounts/login/`,
        { username, password },
        { headers: { 'X-CSRFToken': getCsrfToken() } }
    )
    return response.data
}

export async function logout() {
    const response = await axios.post(`${API_URL}/accounts/logout/`, null, {
        headers: { 'X-CSRFToken': getCsrfToken() },
    })
    return response.status
}

export async function getUsers() {
    const response = await axios.get(`${API_URL}/accounts/users/`)
    return response.data
}
