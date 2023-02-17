import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import menu from '../../../../data/menu';
import classes from './navbar.module.css';

const Navbar = () => {
    const { currentUser, isAdmin } = useAuth();
    const adminStatus = currentUser && isAdmin;
    return (
        <nav className={classes.nav}>
            <ul className={classes.menu}>
                {menu.map(
                    ({ path, name, admin, adminDenied }) =>
                        ((adminStatus && !adminDenied) ||
                            (!adminStatus && !admin)) && (
                            <li key={path} className={classes.item}>
                                <NavLink
                                    to={'/' + path}
                                    className={(isActive) =>
                                        isActive ? classes.active : null
                                    }
                                >
                                    {name}
                                </NavLink>
                            </li>
                        )
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
