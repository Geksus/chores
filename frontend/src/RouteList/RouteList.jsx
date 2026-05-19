import { Route, Routes } from 'react-router-dom'

import Login from '../Auth/Login.jsx'
import Layout from '../Layout/Layout.jsx'
import ChoresList from '../Chores/ChoresList.jsx'
import SignUp from '../Auth/SignUp.jsx'
import AssignmentsList from '../Assignments/AssignmentsList.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import UserManagement from '../Users/UserManagement.jsx'

export default function RouteList() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AssignmentsList />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/chores" element={<ChoresList />} />
                    <Route path="/users" element={<UserManagement />} />
                </Route>
            </Route>
        </Routes>
    )
}
