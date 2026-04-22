import {useEffect, useState} from 'react'
import {Accordion, Container, Form, Table} from 'react-bootstrap'
import {fetchAssignments, fetchChores, fetchUsers} from '../api.js'
import CreateAssignment from "./CreateAssignment.jsx";
import Assignment from "./Assignment.jsx";

export default function AssignmentsList() {
    const [users, setUsers] = useState([])
    const [chores, setChores] = useState([])
    const [assignments, setAssignments] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function getUsersData() {
        setIsLoading(true)
        try {
            const response = await fetchUsers()
            if (response.status === 200) {
                setUsers(response.data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function getChoresData() {
        setIsLoading(true)
        try {
            const response = await fetchChores()
            if (response.status === 200) {
                setChores(response.data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function getAssignments() {
        setIsLoading(true)
        try {
            const response = await fetchAssignments()
            if (response.status === 200) {
                setAssignments(response.data)
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
                fetchAssignments()
            ])
            if (usersRes.status === 200) setUsers(usersRes.data)
            if (choresRes.status === 200) setChores(choresRes.data)
            if (assignmentsRes.status === 200) setAssignments(assignmentsRes.data)
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
        <Container className="d-flex flex-column align-items-center">
            {error !== '' && (
                <div>
                    <Form.Control value={error} disabled></Form.Control>
                </div>
            )}
            <Accordion defaultActiveKey="0" flush className="mb-3 w-75">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create assignment</Accordion.Header>
                    <Accordion.Body>
                        <CreateAssignment users={users} chores={chores} getAssignments={getAssignments}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {isLoading && <span>Loading...</span>}
            {!isLoading && assignments?.length > 0 &&
                <Table striped bordered hover size="sm" className="w-75">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assignments?.map((assignment) => (
                        <Assignment key={assignment.id}
                                    user={users?.find(user => user.id === assignment.user)?.first_name}
                                    chore={chores?.find(chore => chore.id === assignment.chore)?.title}
                                    completed={assignment.completed}/>
                    ))}
                    </tbody>
                </Table>
            }
        </Container>
    )
}
