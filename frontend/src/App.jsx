import './App.css'
import { AuthProvider } from './Context/AuthContext.jsx'
import RouteList from './RouteList/RouteList.jsx'

function App() {
    return (
        <AuthProvider>
            <RouteList />
        </AuthProvider>
    )
}

export default App
