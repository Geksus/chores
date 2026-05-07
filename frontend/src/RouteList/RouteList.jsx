import { Route, Routes } from 'react-router-dom'

import Login from '../auth/Login.jsx'
import Layout from '../Layout/Layout.jsx'
import ChoresList from '../Chores/ChoresList.jsx'
import SignUp from '../auth/SignUp.jsx'
import AssignmentsList from '../Assignments/AssignmentsList.jsx'
import PrivateRoute from './PrivateRoute.jsx'

export default function RouteList() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AssignmentsList />} />
                    <Route path="/chores" element={<ChoresList />} />
                </Route>
            </Route>
        </Routes>
    )
}
