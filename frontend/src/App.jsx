import './App.css'
import { UserProvider } from './context/UserContext.jsx'
import RouteList from './RouteList/RouteList.jsx'

function App() {
    return (
        <UserProvider>
            <RouteList />
        </UserProvider>
    )
}

export default App
