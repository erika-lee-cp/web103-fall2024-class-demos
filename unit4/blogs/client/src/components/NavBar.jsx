import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><h1>Pen & Pixel: Digital Stories 📖</h1></li>
            </ul>
            <ul>
                <li><Link to='/'>All Posts</Link></li>
                <li><Link to='/create'>New</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar
