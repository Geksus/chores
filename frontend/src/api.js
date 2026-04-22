import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

function authHeaders() {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Token ${token}` } : {}
}

export async function login(username, password) {
    const response = await axios.post(`${API_URL}/accounts/login/`, {
        username,
        password,
    })
    const { token, ...user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
}

export async function logout() {
    const response = await axios.post(`${API_URL}/accounts/logout/`, null, {
        headers: authHeaders(),
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return response
}

export async function getUsers() {
    const response = await axios.get(`${API_URL}/accounts/users/`, {
        headers: authHeaders(),
    })
    return response.data
}

export async function fetchChores() {
    const response = await axios.get(`${API_URL}/chores/`, {
        headers: authHeaders(),
    })
    return response
}

export async function createChore(title, description, base_points) {
    return await axios.post(
        `${API_URL}/chores/create/`,
        {
            title,
            description,
            base_points,
        },
        { headers: authHeaders() }
    )
}

export async function deleteChore(pk) {
    return axios.delete(`${API_URL}/chores/delete/${pk}/`, {
        headers: authHeaders(),
    })
}
