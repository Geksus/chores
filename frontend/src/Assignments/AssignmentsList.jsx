import { useEffect, useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import { fetchAssignments, fetchChores, fetchUsers } from '../api.js'
import CreateAssignment from './CreateAssignment.jsx'
import Assignment from './Assignment.jsx'
import CustomAccordion from '../CustomAccordion/CustomAccordion.jsx'
import UsersList from '../Users/UsersList.jsx'

export default function AssignmentsList() {
    const [users, setUsers] = useState([])
    const [chores, setChores] = useState([])
    const [assignments, setAssignments] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [activeKey, setActiveKey] = useState('1')

    async function getAssignments() {
        setIsLoading(true)
        try {
            const response = await fetchAssignments()
            if (response.status === 200) {
                setAssignments(
                    Array.isArray(response.data) ? response.data : []
                )
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function getAllData() {
        setIsLoading(true)
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
        } finally {
            setIsLoading(false)
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
            {error !== '' && (
                <div className="my-2 w-75">
                    <Form.Control
                        className="text-danger"
                        value={error}
                        disabled
                    ></Form.Control>
                </div>
            )}
            {!isLoading && <UsersList />}
            <CustomAccordion
                activeKey={activeKey}
                setActiveKey={setActiveKey}
                title="Assignments"
                component={
                    <CreateAssignment
                        users={users}
                        chores={chores}
                        getAssignments={getAssignments}
                        setActiveKey={setActiveKey}
                    />
                }
            />
            {isLoading && <span>Loading...</span>}
            {!isLoading && assignments?.length > 0 && (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Title</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 &&
                            assignments.map((assignment) => (
                                <tr
                                    key={assignment.id}
                                    className="clickable-row"
                                >
                                    <Assignment
                                        id={assignment.id}
                                        user={users?.find(
                                            (user) =>
                                                user.id === assignment.user
                                        )}
                                        chore={chores?.find(
                                            (chore) =>
                                                chore.id === assignment.chore
                                        )}
                                        completed={assignment.completed}
                                        setError={setError}
                                        getAssignments={getAssignments}
                                    />
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
