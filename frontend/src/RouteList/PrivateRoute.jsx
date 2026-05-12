import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx'

export default function PrivateRoute() {
    const { userData } = useAuth()
    return userData !== undefined ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    )
}
