import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { logout } from '../api.js'
import { useUser } from '../context/UserContext.jsx'

export default function Header() {
    const { userData, setUserData } = useUser()
    const navigate = useNavigate()

    async function handleLogout() {
        const response = await logout()
        if (response.status === 200) {
            setUserData(null)
        }
        navigate('/login')
    }

    return (
        <>
            <header className="d-flex justify-content-between bg-secondary-subtle mb-2">
                {(userData?.name || userData?.username) && (
                    <span className="d-flex flex-column justify-content-center px-3">
                        Hello, {userData?.name || userData?.username}
                    </span>
                )}
                <div className="d-flex gap-2 px-3">
                    <Button
                        className="px-3 bg-secondary"
                        size="sm"
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
                    <Button
                        className="px-3 bg-secondary"
                        size="sm"
                        onClick={() => navigate('/chores')}
                    >
                        Chores
                    </Button>
                    {!userData?.is_child && (
                        <Button
                            className="px-3 bg-secondary"
                            size="sm"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    )}
                    <Button
                        className="px-3"
                        variant="dark"
                        size="sm"
                        onClick={
                            userData?.name || userData?.username
                                ? handleLogout
                                : navigate('/login')
                        }
                    >
                        {userData?.name || userData?.username
                            ? 'Logout'
                            : 'Login'}
                    </Button>
                </div>
            </header>
        </>
    )
}
