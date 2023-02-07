import React from 'react';
import classes from './header.module.css';
import Navbar from './navbar/navbar';
import Logo from './logo/logo';
import LoginButton from './loginButton/loginButton';
import { useAuth } from '../../../hooks/useAuth';
import ProfileBlock from './profileBlock/profileBlock';

const Header = () => {
    const { currentUser } = useAuth();
    return (
        <header className={classes.headerWrap}>
            <div className={classes.header}>
                <Logo />
                <Navbar />
                {currentUser ? <ProfileBlock /> : <LoginButton />}
            </div>
        </header>
    );
};

export default Header;
