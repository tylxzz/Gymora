import { NavLink, Link } from "react-router-dom"

export default function Navbar() {
    return (
        <header className="topbar">
            <div className="topbar-inner">
                <div className="topbar-left">
                    <Link to="/" className="brand">
                        GYMORA
                    </Link>
                </div>

                <nav className="topbar-nav">
                    <a href="/#features" className="topbar-link">
                        Features
                    </a>
                    <a href="/#pricing" className="topbar-link">
                        Pricing
                    </a>
                    <a href="/#about" className="topbar-link">
                        About
                    </a>
                </nav>

                <div className="topbar-right">
                    <Link to="/login" className="topbar-small-link">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-nav">
                        Register
                    </Link>
                </div>
            </div>
        </header>
    )
}