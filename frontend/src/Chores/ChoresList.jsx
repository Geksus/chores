import { useEffect, useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import { fetchChores } from '../api.js'
import Chore from './Chore.jsx'
import CreateChore from './CreateChore.jsx'
import CustomAccordion from '../CustomAccordion/CustomAccordion.jsx'
import { useAuth } from '../Context/AuthContext.jsx'

export default function ChoresList() {
    const [chores, setChores] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [activeKey, setActiveKey] = useState('1')

    const { userData } = useAuth()

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
            <CustomAccordion
                activeKey={activeKey}
                setActiveKey={setActiveKey}
                title="Chores"
                component={
                    <CreateChore
                        getChores={getChores}
                        setActiveKey={setActiveKey}
                    />
                }
            />
            {isLoading && <span>Loading...</span>}
            {!isLoading && chores?.length > 0 && (
                <Table striped bordered hover size="sm" className="w-75">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Points</th>
                            {!userData.is_child && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(chores) &&
                            chores?.map((c) => (
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
