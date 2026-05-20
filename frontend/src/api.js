import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

function redirectToLogin() {
    localStorage.removeItem('token')
    localStorage.removeItem('user:v1')
    window.location.href = '/login'
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    const isAuthRoute = config.url?.includes('/accounts/login/')
    if (!token && !isAuthRoute) {
        redirectToLogin()
        return Promise.reject(new Error('No token'))
    }
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            redirectToLogin()
        }
        return Promise.reject(error)
    }
)

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
    localStorage.setItem('user:v1', JSON.stringify(user))
    return user
}

export async function logout() {
    const response = await axios.post(`${API_URL}/accounts/logout/`, null)
    localStorage.removeItem('token')
    localStorage.removeItem('user:v1')
    return response
}

export async function fetchUsers() {
    return await axios.get(`${API_URL}/accounts/users/`)
}

export async function fetchChores() {
    return await axios.get(`${API_URL}/chores/`)
}

export async function createChore(title, description, base_points) {
    return await axios.post(`${API_URL}/create-chore/`, {
        title,
        description,
        base_points,
    })
}

export async function deleteChore(pk) {
    return axios.delete(`${API_URL}/delete/${pk}/`)
}

export async function createAssignment(tasks) {
    return axios.post(`${API_URL}/create-assignment/`, tasks)
}

export async function fetchAssignments() {
    return axios.get(`${API_URL}/assignments/`)
}

export function completeAssignment(pk, state) {
    return axios.patch(`${API_URL}/update-assignment/${pk}/`, {
        completed: state,
    })
}

export function deleteAssignment(pk) {
    return axios.delete(`${API_URL}/delete-assignment/${pk}/`)
}

export function updateUser(pk, points) {
    return axios.patch(`${API_URL}/accounts/update/${pk}/`, { points: points })
}

export function resetUserPoints(pk) {
    return axios.patch(`${API_URL}/accounts/update/${pk}/`, {
        reset_points: true,
    })
}

export function deleteUser(pk) {
    return axios.delete(`${API_URL}/accounts/delete/${pk}/`)
}
