export default function Assignment({ user, chore, completed }) {
    return (
        <>
            <td className={completed ? 'bg-success' : 'bg-warning'}>{user}</td>
            <td className={completed ? 'bg-success' : 'bg-warning'}>{chore}</td>
            <td className={completed ? 'bg-success' : 'bg-warning'}>
                {completed ? 'Yes' : 'No'}
            </td>
        </>
    )
}
