import './appHeader.scss';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link href="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} href="/">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} href="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;