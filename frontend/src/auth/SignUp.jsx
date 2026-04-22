import { useState } from 'react'
import { addUser } from '../api.js'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Container, Form, InputGroup, Row, Col } from 'react-bootstrap'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [is_child, setIs_child] = useState(false)
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')

    const navigate = useNavigate()

    function validateForm() {
        let data = {
            username: username.length > 2,
            password: password.length > 3,
            confirmPassword: confirmPassword === password,
            email: email.length > 2,
            first_name: first_name.length > 2,
            last_name: last_name.length > 2,
        }
        return Object.values(data).every((val) => val === true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validateForm()) {
            addUser(
                username,
                password,
                email,
                is_child,
                first_name,
                last_name
            ).then(() => navigate('/'))
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Row>
                <Col className="d-flex flex-column align-items-center">
                    <h3>Add usersws</h3>
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
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    aria-label="Confirm Password"
                                    aria-describedby="basic-addon1"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    aria-label="First Name"
                                    aria-describedby="basic-addon1"
                                    value={first_name}
                                    onChange={(e) =>
                                        setFirst_name(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    aria-label="Last Name"
                                    aria-describedby="basic-addon1"
                                    value={last_name}
                                    onChange={(e) =>
                                        setLast_name(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <Form.Check
                                type="checkbox"
                                label="Is Child"
                                checked={is_child}
                                onChange={(e) => setIs_child(e.target.checked)}
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
