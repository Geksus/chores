import { FormControl, Form, Button } from 'react-bootstrap'
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
        <div className="d-flex justify-content-center">
            <Form.Group>
                <Form.Label
                    column="sm"
                    className="bg-warning-subtle w-100 text-start ps-2"
                >
                    Title
                </Form.Label>
                <FormControl className="border-0" value={data.title} readOnly />
            </Form.Group>
            <Form.Group>
                <Form.Label
                    column="sm"
                    className="bg-warning-subtle w-100 text-start ps-2"
                >
                    Description
                </Form.Label>
                <FormControl
                    className="border-0"
                    value={data.description}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label
                    column="sm"
                    className="bg-warning-subtle w-100 text-start ps-2"
                >
                    Points
                </Form.Label>
                <FormControl
                    className="border-0"
                    value={data.base_points}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label
                    column="sm"
                    className="bg-warning-subtle w-100 text-start ps-2"
                >
                    Del
                </Form.Label>
                <div className="text-end">
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => destroyChore(data.id)}
                    >
                        Delete
                    </Button>
                </div>
            </Form.Group>
        </div>
    )
}
