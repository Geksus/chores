import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api.js'
import { useAuth } from '../Context/AuthContext.jsx'
import './Login.css'

export default function Login() {
    const { setUserData } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const data = await login(username, password)
            setUserData?.(data)
            navigate('/')
        } catch {
            setError('Invalid username or password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Sign in</h1>
            {error && <p className="login-error">{error}</p>}
            <div className="login-field">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    className="login-input"
                />
            </div>
            <div className="login-field">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
                {loading ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    )
}
