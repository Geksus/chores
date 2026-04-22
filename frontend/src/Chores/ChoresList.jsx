import { useEffect, useState } from 'react'
import { fetchChores } from '../api.js'
import { Container, Form } from 'react-bootstrap'
import Chore from './Chore.jsx'
import { errorTimeout } from '../utils/utils.js'

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
            {chores?.length > 0 && (
                <div>
                    {chores.map((c) => (
                        <Chore
                            key={c.id}
                            data={c}
                            setIsLoading={setIsLoading}
                            setError={setError}
                        />
                    ))}
                </div>
            )}
        </Container>
    )
}
