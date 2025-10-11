import { Link } from "react-router"

export function Header() {
    return (
        <header>
            <nav>
                <Link to="/">University</Link>
                <Link to="/favorites">Favorites</Link>
            </nav>
        </header>
    )
}