import { Button } from 'react-bootstrap'
import { deleteChore } from '../api.js'

export default function Chore({ data, setIsLoading, setError }) {
    async function destroyChore(id) {
        setIsLoading(true)
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
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <tr>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.base_points}</td>
            <td>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => destroyChore(data.id)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}
