import { useNavigate } from 'react-router-dom'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { logout } from '../api.js'
import { useAuth } from '../Context/AuthContext.jsx'

export default function Header() {
    const { userData, setUserData } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        if (confirm('Are you sure you want to log out?')) {
            try {
                const response = await logout()
                if (response.status === 200) {
                    setUserData(null)
                }
                navigate('/login')
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    return (
        <header>
            {(userData?.name || userData?.username) && (
                <div className="d-flex flex-column justify-content-center px-3">
                    <span>
                        Hello,{' '}
                        <strong>{userData?.name || userData?.username}</strong>
                    </span>
                </div>
            )}
            <DropdownButton
                size="sm"
                variant="secondary"
                align="end"
                title="Menu"
            >
                <Dropdown.Item href="/">Home</Dropdown.Item>
                <Dropdown.Item href="/chores">Chores</Dropdown.Item>

                {!userData?.is_child && (
                    <div>
                        <Dropdown.Item href="/users">Users</Dropdown.Item>
                        <Dropdown.Item href="/register">Add user</Dropdown.Item>
                    </div>
                )}
                <Dropdown.Divider />
                {userData?.username ? (
                    <Dropdown.Item as="button" onClick={handleLogout}>
                        Logout
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                )}
            </DropdownButton>
        </header>
    )
}
