import './appHeader.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> портал по комиксам
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/">Персонажи</NavLink></li>
                    /
                    <li><NavLink activeStyle={{'color': '#9f0013'}} to="/comics">Комиксы</NavLink></li>
										/
										<li><NavLink activeStyle={{'color': '#9f0013'}} to="/about-us">Контакты</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;