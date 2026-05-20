import { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { fetchUsers, updateUser } from '../api.js'
import { useError } from '../hooks/useError.jsx'

export default function UsersList({
    users: propsUsers,
    getUsers: propsGetUsers,
    userData: propsUserData,
}) {
    const [internalUsers, setInternalUsers] = useState([])
    const [errorMessage, setErrorMessage] = useError()

    const users = propsUsers || internalUsers
    const getUsers = propsGetUsers || getInternalUsers

    async function getInternalUsers() {
        try {
            const response = await fetchUsers()
            if (response.status === 200 && response.data.length > 0) {
                setInternalUsers(response.data)
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        }
    }

    async function resetPoints(pk, points) {
        try {
            await updateUser(pk, points)
            await getUsers()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if (!propsUsers) {
            getInternalUsers()
        }
    }, [propsUsers])

    return (
        <div className={propsUserData.is_child ? 'w-100 mb-2' : 'w-100'}>
            {errorMessage !== '' && (
                <Form className="mb-2">
                    <Form.Control
                        disabled
                        className="text-danger"
                        value={errorMessage}
                    />
                </Form>
            )}
            {users?.length > 0 && (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Points</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr
                                className={
                                    user.points >= 1000
                                        ? 'users-table pulse'
                                        : 'users-table'
                                }
                                key={user.username}
                                style={{
                                    background: `linear-gradient(to right, rgba(80, 245, 39, 0.7) ${Math.min(user.points / 10, 100)}%, transparent ${Math.min(user.points / 10, 100)}%)`,
                                }}
                            >
                                <td>{user.first_name}</td>
                                <td>{user.points}</td>
                                {!propsUserData.is_child && (
                                    <td className="text-end">
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                resetPoints(user.id, 0)
                                            }
                                        >
                                            Reset
                                        </Button>
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
