import { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { fetchChores } from '../api.js'
import Chore from './Chore.jsx'
import CreateChore from './CreateChore.jsx'
import CustomAccordion from '../CustomAccordion/CustomAccordion.jsx'
import { useAuth } from '../Context/AuthContext.jsx'
import { useError } from '../hooks/useError.jsx'

export default function ChoresList() {
    const [chores, setChores] = useState([])
    const [errorMessage, setErrorMessage] = useError()
    const [activeKey, setActiveKey] = useState('1')

    const { userData } = useAuth()

    async function getChores() {
        try {
            const response = await fetchChores()
            if (response.status === 200) {
                setChores(response.data)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        getChores()
    }, [])

    return (
        <div className="d-flex flex-column align-items-center">
            <title>Chores</title>
            {errorMessage !== '' && (
                <div>
                    <Form.Control value={errorMessage} disabled></Form.Control>
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
            {chores?.length > 0 && (
                <Table striped bordered hover size="sm">
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
                                    setError={setErrorMessage}
                                />
                            ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
