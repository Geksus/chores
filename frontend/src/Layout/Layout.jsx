import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ setUserData }) {
    return (
        <div>
            <Header setUserData={setUserData} />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
