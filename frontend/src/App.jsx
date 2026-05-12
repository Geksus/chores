import './App.css'
import { UserProvider } from './Context/UserContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import RouteList from './RouteList/RouteList.jsx'

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <RouteList />
            </UserProvider>
        </AuthProvider>
    )
}

export default App
