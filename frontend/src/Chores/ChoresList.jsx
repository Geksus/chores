import {useEffect, useState} from 'react'
import {fetchChores} from '../api.js'
import { Accordion, Container, Form, Table } from 'react-bootstrap'
import Chore from './Chore.jsx'
import CreateChore from './CreateChore.jsx'

export default function ChoresList() {
    const [chores, setChores] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function getChores() {
        setIsLoading(true)
        try {
            const response = await fetchChores()
            if (response.status === 200) {
                setChores(response.data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getChores()
    }, [])

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => setError(''), 10000)
        }
    }, [error])

    return (
        <Container className="d-flex flex-column align-items-center">
            {error !== '' && (
                <div>
                    <Form.Control value={error} disabled></Form.Control>
                </div>
            )}
            <Accordion defaultActiveKey="0" flush className="mb-3 w-75">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create chore</Accordion.Header>
                    <Accordion.Body>
                        <CreateChore getChores={getChores}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {isLoading && <span>Loading...</span>}
            {!isLoading && chores?.length > 0 && (
                <Table striped bordered hover size="sm" className="w-75">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Points</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {chores.map((c) => (
                            <Chore
                                key={c.id}
                                data={c}
                                setIsLoading={setIsLoading}
                                setError={setError}
                            />
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}
