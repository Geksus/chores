import { logout } from '../api.js'

export default function Header({ setUserData }) {
    async function handleLogout() {
        const status = await logout()
        if (status === 200) {
            setUserData(null)
        }
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
