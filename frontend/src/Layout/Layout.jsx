import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <div className="layout-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
