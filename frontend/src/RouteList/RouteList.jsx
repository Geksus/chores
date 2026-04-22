import { Route, Routes } from 'react-router-dom'

import Login from '../auth/Login.jsx'
import Layout from '../Layout/Layout.jsx'
import UsersList from '../Users.jsx'
import CreateChore from '../Chores/CreateChore.jsx'
import ChoresList from '../Chores/ChoresList.jsx'

export default function RouteList() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index={true} element={<UsersList />} />
                <Route path="/create-chore" element={<CreateChore />} />
                <Route path="/chores" element={<ChoresList />} />
            </Route>
        </Routes>
    )
}
