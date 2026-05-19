import { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { fetchAssignments, fetchChores, fetchUsers } from '../api.js'
import Assignment from './Assignment.jsx'
import UsersList from '../Users/UsersList.jsx'
import { useAuth } from '../Context/AuthContext.jsx'
import CreateAssignmentsModal from '../Modals/CreateAssignmentsModal.jsx'

export default function AssignmentsList() {
    const [users, setUsers] = useState([])
    const [chores, setChores] = useState([])
    const [assignments, setAssignments] = useState([])
    const [error, setError] = useState('')

    const { userData } = useAuth()

    async function getAssignments() {
        try {
            const [assignmentsRes, usersRes] = await Promise.all([
                fetchAssignments(),
                fetchUsers(),
            ])
            if (assignmentsRes.status === 200) {
                setAssignments(
                    Array.isArray(assignmentsRes.data)
                        ? assignmentsRes.data
                        : []
                )
            }
            if (usersRes.status === 200) {
                setUsers(usersRes.data)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    async function getAllData() {
        try {
            const [usersRes, choresRes, assignmentsRes] = await Promise.all([
                fetchUsers(),
                fetchChores(),
                fetchAssignments(),
            ])
            if (usersRes.status === 200) setUsers(usersRes.data)
            if (choresRes.status === 200) setChores(choresRes.data)
            if (assignmentsRes.status === 200)
                setAssignments(
                    Array.isArray(assignmentsRes.data)
                        ? assignmentsRes.data
                        : []
                )
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => setError(''), 10000)
        }
    }, [error])

    return (
        <div className="d-flex flex-column align-items-center">
            <title>Home</title>
            {error !== '' && (
                <div className="my-2 w-75">
                    <Form.Control
                        className="text-danger"
                        value={error}
                        disabled
                    ></Form.Control>
                </div>
            )}
            <UsersList
                users={users}
                getUsers={getAssignments}
                userData={userData}
            />
            {!userData.is_child && (
                <CreateAssignmentsModal
                    assignments={assignments}
                    getAssignments={getAssignments}
                    users={users}
                    chores={chores}
                />
            )}
            {users.map((user) => {
                const userAssignments = assignments.filter(
                    (a) => a.user === user.id
                )
                if (userAssignments.length === 0) return null
                return (
                    <Table key={user.id} striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th colSpan={3} className="text-start ps-2">
                                    {user.first_name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAssignments.map((assignment) => (
                                <tr
                                    key={assignment.id}
                                    className="clickable-row"
                                >
                                    <Assignment
                                        id={assignment.id}
                                        chore={chores?.find(
                                            (chore) =>
                                                chore.id === assignment.chore
                                        )}
                                        user={user}
                                        userData={userData}
                                        completed={assignment.completed}
                                        setError={setError}
                                        getAssignments={getAssignments}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            })}
        </div>
    )
}
