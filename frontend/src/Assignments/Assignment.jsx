export default function Assignment({user, chore, completed}) {
    return (<tr>
        <td>{user}</td>
        <td>{chore}</td>
        <td>{completed ? 'Yes' : 'No'}</td>
    </tr>)
}