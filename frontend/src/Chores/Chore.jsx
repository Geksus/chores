import { Button } from 'react-bootstrap'
import { deleteChore } from '../api.js'
import { useAuth } from '../Context/AuthContext.jsx'

export default function Chore({ data, setError }) {
    const { userData } = useAuth()
    async function destroyChore(id) {
        try {
            const agree = confirm(
                `Are you sure you want to delete ${data.title}?`
            )
            if (agree) {
                await deleteChore(id)
                window.location.reload()
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <tr>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.base_points}</td>
            {!userData.is_child && (
                <td>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => destroyChore(data.id)}
                    >
                        Delete
                    </Button>
                </td>
            )}
        </tr>
    )
}
