import { Button, DropdownButton, Dropdown } from 'react-bootstrap'

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
                className={`text-start align-middle ps-2 ${completed ? 'bg-success bg-opacity-75' : 'bg-warning bg-opacity-75'}`}
            >
                <span>{`${chore.title} | ${chore.description}`}</span>
            </td>
            <td
                style={{ width: '200px' }}
                className={`align-middle ${completed ? 'bg-success bg-opacity-75' : 'bg-warning bg-opacity-75'}`}
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
        <DropdownButton
            size="sm"
            variant="warning"
            align="end"
            title="Confirm?"
        >
            <Dropdown.Item
                as="button"
                onClick={cleanUp}
                size="sm"
                className="bg-success"
            >
                Confirm
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
                as="button"
                onClick={unFinishAssignment}
                size="sm"
                className="bg-danger"
            >
                Cancel
            </Dropdown.Item>
        </DropdownButton>
    )
}
