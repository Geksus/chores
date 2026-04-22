import {useEffect, useState} from "react";
import {fetchUsers} from "./api.js";

export default function UsersList() {
    const [users, setUsers] = useState([])

    async function collectUsers() {
        const response = await fetchUsers()
        setUsers(response)
    }

    useEffect(() => {
        if (users.length === 0) {
            collectUsers()
        }
    }, []);

    return <div>
        {users.length > 0 && users.map((user) => (<div key={user.username}>{user.username}</div>))}
    </div>
}