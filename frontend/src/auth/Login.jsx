import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api.js'

export default function Login({ setUserData }) {
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
        <form onSubmit={handleSubmit} style={styles.form}>
            <h1>Sign in</h1>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    style={styles.input}
                />
            </div>
            <div style={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '320px',
        margin: '80px auto',
        padding: '32px',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        textAlign: 'left',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    input: {
        padding: '8px 12px',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        font: 'inherit',
        background: 'var(--bg)',
        color: 'var(--text-h)',
    },
    button: {
        padding: '10px',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        font: 'inherit',
        fontWeight: '500',
        cursor: 'pointer',
    },
    error: {
        color: '#e53e3e',
        fontSize: '14px',
        margin: 0,
    },
}
