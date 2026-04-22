import {useEffect, useState} from 'react'
import {createChore} from '../api.js'
import {Button, Container, Form, FormControl, InputGroup,} from 'react-bootstrap'
import {errorTimeout} from '../utils/utils.js'

export default function CreateChore({getChores}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [base_points, setBase_points] = useState(0)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await createChore(title, description, base_points)
            setTitle('')
            setDescription('')
            setBase_points(0)
            getChores()
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        errorTimeout(error)
    }, [error])

    return (
        <Container>
            {isLoading && <span>Loading...</span>}
            {error !== '' && (
                <div>
                    <Form.Control value={error} disabled></Form.Control>
                </div>
            )}
            <Form
                className="d-flex flex-column gap-2"
                onSubmit={(e) => handleSubmit(e)}
            >
                <InputGroup size="sm">
                    <InputGroup.Text className="w-25" column="sm">
                        Title
                    </InputGroup.Text>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                </InputGroup>
                <InputGroup size="sm">
                    <InputGroup.Text className="w-25" column="sm">
                        Description
                    </InputGroup.Text>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </InputGroup>
                <InputGroup size="sm">
                    <InputGroup.Text className="w-25" column="sm">
                        Points
                    </InputGroup.Text>
                    <Form.Control
                        value={base_points}
                        type="number"
                        isInvalid={isNaN(base_points)}
                        onChange={(e) => setBase_points(e.target.valueAsNumber)}
                    ></Form.Control>
                    <FormControl.Feedback type="invalid">
                        Please input a valid number
                    </FormControl.Feedback>
                </InputGroup>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => handleSubmit(e)}
                >
                    Create
                </Button>
            </Form>
        </Container>
    )
}
