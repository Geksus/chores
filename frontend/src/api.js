import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

function authHeaders() {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Token ${token}` } : {}
}

export async function addUser(
    username,
    password,
    email,
    is_child,
    first_name,
    last_name
) {
    return await axios.post(`${API_URL}/accounts/register/`, {
        username,
        password,
        email,
        is_child,
        first_name,
        last_name,
    })
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

export async function fetchUsers() {
    return await axios.get(`${API_URL}/accounts/users/`, {
        headers: authHeaders(),
    })
}

export async function fetchChores() {
    return await axios.get(`${API_URL}/chores`, {
        headers: authHeaders(),
    })
}

export async function createChore(title, description, base_points) {
    return await axios.post(
        `${API_URL}/create-chore/`,
        {
            title,
            description,
            base_points,
        },
        { headers: authHeaders() }
    )
}

export async function deleteChore(pk) {
    return axios.delete(`${API_URL}/delete/${pk}/`, {
        headers: authHeaders(),
    })
}

export async function createAssignment(user, chore) {
    return axios.post(
        `${API_URL}/create-assignment/`,
        {
            user,
            chore,
        },
        { headers: authHeaders() }
    )
}

export async function fetchAssignments() {
    return axios.get(`${API_URL}/assignments/`, {
        headers: authHeaders(),
    })
}

export function completeAssignment(pk) {
    return axios.patch(`${API_URL}/update-assignment/${pk}/`, null, {
        headers: authHeaders(),
    })
}

export function deleteAssignment(pk) {
    return axios.delete(`${API_URL}/delete-assignment/${pk}/`, {
        headers: authHeaders(),
    })
}
