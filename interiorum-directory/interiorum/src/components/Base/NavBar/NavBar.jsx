import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <img src="" alt="" />
            <ul>
                <li>
                    <NavLink to='home'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='forum'>Forum</NavLink>
                </li>
                <li>
                    <NavLink to='about'>About</NavLink>
                </li>
                <li>
                    Log In
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
