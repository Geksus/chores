import { Button, DropdownButton, Dropdown } from 'react-bootstrap'

import { completeAssignment, deleteAssignment, updateUser } from '../api.js'

export default function Assignment({
    id,
    user,
    userData,
    chore,
    completed,
    setErrorMessage,
    getAssignments,
}) {
    async function finishAssignment(id) {
        try {
            await completeAssignment(id, true)
            await getAssignments()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    async function removeAssignment(id) {
        try {
            await deleteAssignment(id)
            await getAssignments()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    function isCompleted() {
        if (userData?.is_child === true) {
            return completed ? (
                'Yes'
            ) : user.id === userData.id ? (
                <Button
                    onClick={() => finishAssignment(id)}
                    variant="secondary"
                    size="sm"
                    className="border-1 border-white"
                >
                    Complete
                </Button>
            ) : (
                'No'
            )
        }
        return completed ? (
            <CompletionConfirmation
                id={id}
                setErrorMessage={setErrorMessage}
                getAssignments={getAssignments}
                userId={user.id}
                chorePoints={chore.base_points}
            />
        ) : (
            <div className="d-flex justify-content-evenly">
                <Button
                    onClick={() => finishAssignment(id)}
                    variant="secondary"
                    size="sm"
                    className="border-1 border-white"
                >
                    Complete
                </Button>
                <Button
                    onClick={() => removeAssignment(id)}
                    variant="warning"
                    size="sm"
                    className="border-1 border-white"
                >
                    Remove
                </Button>
            </div>
        )
    }

    return (
        <>
            <td
                className={`text-start align-middle ps-2 ${completed ? 'bg-success bg-opacity-75' : 'bg-warning bg-opacity-75'}`}
            >
                <span>{`${chore.title} ${chore.description && `| ${chore.description}`}`}</span>
            </td>
            <td
                style={{ width: '250px' }}
                className={`align-middle ${completed ? 'bg-success bg-opacity-75' : 'bg-warning bg-opacity-75'}`}
            >
                {isCompleted()}
            </td>
        </>
    )
}

function CompletionConfirmation({
    id,
    setErrorMessage,
    getAssignments,
    userId,
    chorePoints,
}) {
    async function unFinishAssignment() {
        try {
            await completeAssignment(id, false)
            await getAssignments()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    async function cleanUp() {
        try {
            const [delAssignment, updUser, fetchAssignments] =
                await Promise.all([
                    deleteAssignment(id),
                    updateUser(userId, chorePoints),
                    getAssignments(),
                ])
            return [
                delAssignment.status,
                updUser.status,
                fetchAssignments.status,
            ]
        } catch (error) {
            setErrorMessage(error.message)
        }
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
