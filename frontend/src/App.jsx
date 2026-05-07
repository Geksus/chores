import './App.css'
import { UserProvider } from './context/UserContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
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
