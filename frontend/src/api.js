import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

function redirectToLogin() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    const isAuthRoute = config.url?.includes('/accounts/login/')
    if (!token && !isAuthRoute) {
        redirectToLogin()
        return Promise.reject(new Error('No token'))
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

export async function createAssignment(tasks) {
    return axios.post(`${API_URL}/create-assignment/`, tasks, {
        headers: authHeaders(),
    })
}

export async function fetchAssignments() {
    return axios.get(`${API_URL}/assignments/`, {
        headers: authHeaders(),
    })
}

export function completeAssignment(pk, state) {
    return axios.patch(
        `${API_URL}/update-assignment/${pk}/`,
        { completed: state },
        {
            headers: authHeaders(),
        }
    )
}

export function deleteAssignment(pk) {
    return axios.delete(`${API_URL}/delete-assignment/${pk}/`, {
        headers: authHeaders(),
    })
}

export function updateUser(pk, points) {
    return axios.patch(
        `${API_URL}/accounts/update/${pk}/`,
        { points: points },
        { headers: authHeaders() }
    )
}

export function resetUserPoints(pk) {
    return axios.patch(
        `${API_URL}/accounts/update/${pk}/`,
        { reset_points: true },
        { headers: authHeaders() }
    )
}

export function deleteUser(pk) {
    return axios.delete(`${API_URL}/accounts/delete/${pk}/`, {
        headers: authHeaders(),
    })
}
