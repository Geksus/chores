import { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { createAssignment } from '../api.js'

export default function CreateAssignment({
    users,
    chores,
    getAssignments,
    setActiveKey,
}) {
    const [assignee, setAssignee] = useState(0)
    const [task, setTask] = useState(0)
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await createAssignment(assignee, task)
            getAssignments()
            setActiveKey(null)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => setError(''), 10000)
        }
    }, [error])

    return (
        <Container>
            {error !== '' && (
                <div className="mb-2">
                    <Form.Control
                        className="text-danger"
                        value={error}
                        disabled
                    ></Form.Control>
                </div>
            )}
            <Form
                className="d-flex flex-column gap-2"
                onSubmit={(e) => handleSubmit(e)}
            >
                <InputGroup size="sm">
                    <InputGroup.Text className="w-25" column="sm">
                        Assignee
                    </InputGroup.Text>
                    <Form.Select
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    >
                        <option value={0}>Select user</option>
                        {Array.isArray(users) &&
                            users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                    </Form.Select>
                </InputGroup>
                <InputGroup size="sm">
                    <InputGroup.Text className="w-25" column="sm">
                        Task
                    </InputGroup.Text>
                    <Form.Select
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    >
                        <option value={0}>Select chore</option>
                        {Array.isArray(chores) &&
                            chores?.map((chore) => (
                                <option key={chore.id} value={chore.id}>
                                    {chore.title}
                                </option>
                            ))}
                    </Form.Select>
                </InputGroup>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => handleSubmit(e)}
                >
                    Assign
                </Button>
            </Form>
        </Container>
    )
}
