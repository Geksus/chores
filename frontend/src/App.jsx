import './App.css'
import { useState } from 'react'
import RouteList from './RouteList/RouteList.jsx'

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5">Loading...</div>
        )
    }

    return (
        <>
            <RouteList userData={userData} setUserData={setUserData} />
        </>
    )
}

export default App
