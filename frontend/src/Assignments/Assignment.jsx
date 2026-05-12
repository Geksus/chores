import { Button } from 'react-bootstrap'

import { completeAssignment, deleteAssignment, updateUser } from '../api.js'
import { useAuth } from '../Context/AuthContext.jsx'

export default function Assignment({
    id,
    user,
    chore,
    completed,
    setError,
    getAssignments,
}) {
    const { userData } = useAuth()

    async function finishAssignment(id) {
        try {
            await completeAssignment(id, true)
            await getAssignments()
        } catch (error) {
            setError(error.message)
        }
    }

    function isCompleted() {
        if (userData?.is_child === true) {
            return completed ? (
                'Yes'
            ) : (
                <Button
                    onClick={() => finishAssignment(id)}
                    variant="secondary"
                    size="sm"
                    className="border-1 border-white"
                >
                    Complete
                </Button>
            )
        }
        return completed ? (
            <CompletionConfirmation
                id={id}
                setError={setError}
                getAssignments={getAssignments}
                userId={user.id}
                chorePoints={chore.base_points}
            />
        ) : (
            <Button
                onClick={() => finishAssignment(id)}
                variant="secondary"
                size="sm"
                className="border-1 border-white"
            >
                Complete
            </Button>
        )
    }

    return (
        <>
            <td
                className={`align-middle ${completed ? 'bg-success' : 'bg-warning'}`}
            >
                <span>{user.first_name}</span>
            </td>
            <td
                className={`align-middle ${completed ? 'bg-success' : 'bg-warning'}`}
            >
                <span>{chore.title}</span>
            </td>
            <td
                style={{ width: '360px' }}
                className={`align-middle ${completed ? 'bg-success' : 'bg-warning'}`}
            >
                {isCompleted()}
            </td>
        </>
    )
}

function CompletionConfirmation({
    id,
    setError,
    getAssignments,
    userId,
    chorePoints,
}) {
    console.log(userId, chorePoints)

    async function unFinishAssignment() {
        try {
            await completeAssignment(id, false)
            await getAssignments()
        } catch (error) {
            setError(error.message)
        }
    }

    async function cleanUp() {
        await deleteAssignment(id)
        await updateUser(userId, chorePoints)
        await getAssignments()
    }

    return (
        <div className="d-flex justify-content-evenly">
            <Button
                onClick={cleanUp}
                variant="success"
                size="sm"
                className="border-1 border-white w-25"
            >
                Confirm
            </Button>
            <Button
                onClick={unFinishAssignment}
                variant="danger"
                size="sm"
                className="border-1 border-white w-25"
            >
                Cancel
            </Button>
        </div>
    )
}
