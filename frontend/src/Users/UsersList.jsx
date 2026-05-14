import { useEffect, useState } from 'react'
import { fetchUsers, updateUser } from '../api.js'
import { Button, Container, Table } from 'react-bootstrap'

export default function UsersList({
    users: propsUsers,
    getUsers: propsGetUsers,
}) {
    const [internalUsers, setInternalUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const users = propsUsers || internalUsers
    const getUsers = propsGetUsers || getInternalUsers

    async function getInternalUsers() {
        try {
            setIsLoading(true)
            const response = await fetchUsers()
            if (response.status === 200 && response.data.length > 0) {
                setInternalUsers(response.data)
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
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

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => setErrorMessage(''), 10000)
        }
    }, [errorMessage])

    return (
        <div className="w-100">
            {isLoading ? (
                <div className="d-flex flex-column justify-content-center">
                    <span>Loading...</span>
                </div>
            ) : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Points</th>
                            <th></th>
                        </tr>
                    </thead>
                    {users?.length > 0 && (
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
                                </tr>
                            ))}
                        </tbody>
                    )}
                </Table>
            )}
        </div>
    )
}
