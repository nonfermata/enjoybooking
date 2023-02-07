import React from 'react';
import logo from '../../../../assets/images/logo.png';
import classes from './logo.module.css';
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink to='/home' className={classes.link}>
            <img className={classes.logo} src={logo} alt='logo' />
        </NavLink>
    );
};

export default Logo;
