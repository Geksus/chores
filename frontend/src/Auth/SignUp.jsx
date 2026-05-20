import { useReducer } from 'react'
import { Container, Form, InputGroup, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../api.js'
import Button from 'react-bootstrap/Button'
import { useError } from '../hooks/useError.jsx'

const initialForm = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    is_child: false,
    first_name: '',
    last_name: '',
}

function formReducer(state, { field, value }) {
    return { ...state, [field]: value }
}

export default function SignUp() {
    const [form, dispatch] = useReducer(formReducer, initialForm)
    const [errorMessage, setErrorMessage] = useError()

    const navigate = useNavigate()

    function set(field) {
        return (e) =>
            dispatch({
                field,
                value:
                    e.target.type === 'checkbox'
                        ? e.target.checked
                        : e.target.value,
            })
    }

    function validateForm() {
        return (
            form.username.length > 2 &&
            form.password.length > 3 &&
            form.confirmPassword === form.password &&
            form.email.length > 2 &&
            form.first_name.length > 2 &&
            form.last_name.length > 2
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validateForm()) {
            try {
                addUser(
                    form.username,
                    form.password,
                    form.email,
                    form.is_child,
                    form.first_name,
                    form.last_name
                ).then(() => navigate('/'))
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <title>SignUp</title>
            {errorMessage !== '' && (
                <Form.Control value={errorMessage} disabled />
            )}
            <Row>
                <Col className="d-flex flex-column align-items-center">
                    <h3>Add user</h3>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicUsername"
                        >
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={form.username}
                                    onChange={set('username')}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    value={form.password}
                                    onChange={set('password')}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    aria-label="Confirm Password"
                                    aria-describedby="basic-addon1"
                                    value={form.confirmPassword}
                                    onChange={set('confirmPassword')}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    value={form.email}
                                    onChange={set('email')}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    aria-label="First Name"
                                    aria-describedby="basic-addon1"
                                    value={form.first_name}
                                    onChange={set('first_name')}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    aria-label="Last Name"
                                    aria-describedby="basic-addon1"
                                    value={form.last_name}
                                    onChange={set('last_name')}
                                />
                            </InputGroup>
                            <Form.Check
                                type="checkbox"
                                label="Is Child"
                                checked={form.is_child}
                                onChange={set('is_child')}
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="success" onClick={(e) => handleSubmit(e)}>
                        Sign Up
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
