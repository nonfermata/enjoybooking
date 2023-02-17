import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../../hooks/useAuth';
import burger from '../../../common/svg/burger';
import closeMenu from '../../../common/svg/closeMenu';
import menu from '../../../../data/menu';
import { onAppClicked } from '../../../../../redux/onAppClickReducer';
import classes from './navbarBurger.module.css';

const NavbarBurger = () => {
    const { currentUser, isAdmin } = useAuth();
    const adminStatus = currentUser && isAdmin;
    const [burgerStatus, setBurgerStatus] = useState(false);
    const onAppClick = useSelector(onAppClicked());
    const handleBurgerClick = () => {
        setBurgerStatus((prevState) => !prevState);
    };
    const handleMenuClick = () => {
        setBurgerStatus(false);
    };
    useEffect(() => {
        setBurgerStatus(false);
    }, [onAppClick]);
    return (
        <div className={classes.burgerMenuWrap}>
            <div className={classes.burger} onClick={handleBurgerClick}>
                {burgerStatus ? closeMenu : burger}
            </div>
            <ul
                className={
                    classes.burgerMenu +
                    (burgerStatus ? ' ' + classes.burgerMenuVisible : '')
                }
            >
                {menu.map(
                    ({ path, name, admin, adminDenied }) =>
                        ((adminStatus && !adminDenied) ||
                            (!adminStatus && !admin)) && (
                            <li key={path} className={classes.item}>
                                <NavLink
                                    to={'/' + path}
                                    onClick={handleMenuClick}
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
        </div>
    );
};

export default NavbarBurger;
