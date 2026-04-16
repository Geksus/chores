import { Route, Routes } from 'react-router-dom'

import Login from '../auth/Login.jsx'
import Layout from '../Layout/Layout.jsx'
import UsersList from '../Users.jsx'

export default function RouteList({ userData, setUserData }) {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login setUserData={setUserData} />}
            />
            <Route
                path="/"
                element={
                    userData ? (
                        <Layout setUserData={setUserData} />
                    ) : (
                        <Login setUserData={setUserData} />
                    )
                }
            >
                <Route index={true} element={<UsersList />} />
            </Route>
        </Routes>
    )
}
