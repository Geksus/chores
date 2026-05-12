import { useEffect, useState } from 'react'
import { fetchUsers } from '../api.js'
import { Container, Table } from 'react-bootstrap'

export default function UsersList() {
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function getUsers() {
        try {
            setIsLoading(true)
            const response = await fetchUsers()
            if (response.status === 200 && response.data.length > 0) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => setErrorMessage(''), 10000)
        }
    }, [errorMessage])

    return (
        <Container fluid>
            {isLoading ? (
                <div className="d-flex flex-column justify-content-center">
                    <span>Loading...</span>
                </div>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Family name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    {users?.length > 0 && (
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user.username}>
                                    <td>{user.username}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </Table>
            )}
        </Container>
    )
}
