import React from 'react';
import Navbar from './navbar/navbar';
import Logo from './logo/logo';
import LoginButton from './loginButton/loginButton';
import ProfileBlock from './profileBlock/profileBlock';
import NavbarBurger from './navbarBurger/navbarBurger';
import { useAuth } from '../../../hooks/useAuth';
import classes from './header.module.css';

const Header = () => {
    const { currentUser } = useAuth();
    return (
        <header className={classes.headerWrap}>
            <div className={classes.header}>
                <NavbarBurger />
                <Logo />
                <Navbar />
                {currentUser ? <ProfileBlock /> : <LoginButton />}
            </div>
        </header>
    );
};

export default Header;
