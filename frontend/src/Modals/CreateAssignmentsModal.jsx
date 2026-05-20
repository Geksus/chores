import { useState } from 'react'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { createAssignment } from '../api.js'
import { useError } from '../hooks/useError.jsx'

export default function CreateAssignmentsModal(props) {
    const [show, setShow] = useState(false)
    const [assignee, setAssignee] = useState(0)
    const [tasks, setTasks] = useState([])
    const [errorMessage, setErrorMessage] = useError()

    const handleShow = () => setShow(true)

    function handleClose() {
        setAssignee(0)
        setTasks([])
        setShow(false)
    }

    function handleAssigneeChange(e) {
        const id = Number(e)
        if (!id) {
            setAssignee(0)
            setTasks([])
            return
        }
        const assignedChores = props.assignments.reduce((acc, a) => {
            if (a.user === id) acc.push(a.chore)
            return acc
        }, [])
        setAssignee(id)
        setTasks(assignedChores)
    }

    function manageTasks(id) {
        let temp = tasks
        if (temp.includes(id)) {
            temp = temp.filter((val) => val !== id)
            setTasks(temp)
        } else {
            setTasks([...temp, id])
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const data = []
            for (let task of tasks) {
                data.push({ user: assignee, chore: task })
            }
            await createAssignment(data)
            props.getAssignments()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <>
            <Button
                variant="success"
                onClick={handleShow}
                className="mb-3 align-self-end"
            >
                + Add
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    {errorMessage === '' ? (
                        <strong>Assign tasks</strong>
                    ) : (
                        errorMessage
                    )}
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Text className="w-25" column="sm">
                            User
                        </InputGroup.Text>

                        <Form.Select
                            value={assignee}
                            onChange={(e) =>
                                handleAssigneeChange(e.target.value)
                            }
                        >
                            <option value={null}>Select user</option>
                            {Array.isArray(props.users) &&
                                props.users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.first_name}
                                    </option>
                                ))}
                        </Form.Select>
                    </InputGroup>
                    {Array.isArray(props.chores) && (
                        <div>
                            {props.chores.map((chore) => (
                                <Form.Check
                                    key={chore.id}
                                    type="checkbox"
                                    checked={tasks.includes(chore.id)}
                                    label={`${chore.title} ${chore.description && `| ${chore.description}`}`}
                                    onChange={() => manageTasks(chore.id)}
                                />
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
