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
    const [showPassword, setShowPassword] = useState(false)

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
        <div>
            <title>Login</title>
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
                    <div className="login-password-wrapper">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                        <button
                            type="button"
                            className="login-password-toggle"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}
