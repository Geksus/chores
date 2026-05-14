import { useEffect, useState } from 'react'
import { deleteUser, fetchUsers } from '../api.js'
import { Button, Form, Table } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext.jsx'

export default function UserManagement() {
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const { userData } = useAuth()
    console.log(userData)

    async function getUsers() {
        try {
            const response = await fetchUsers()
            if (response.status === 200) {
                setUsers(response.data)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    async function destroyUser(id) {
        if (id === userData.id) {
            setErrorMessage('You can not delete yourself')
            return
        }
        try {
            const response = await deleteUser(id)
            if (response.status === 204) {
                getUsers()
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => setErrorMessage(''), 10000)
        }
    }, [errorMessage])

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="w-100 mb-2">
            {errorMessage !== '' && (
                <Form className="mb-2">
                    <Form.Control
                        disabled
                        className="text-danger"
                        value={errorMessage}
                    />
                </Form>
            )}
            {users.length > 0 && (
                <Table striped hover className="users-table">
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                {!userData.is_child && (
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => destroyUser(user.id)}
                                        >
                                            Delete
                                        </Button>{' '}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
