import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import classes from './logo.module.css';

const Logo = () => {
    return (
        <NavLink to='/home' className={classes.link}>
            <img className={classes.logo} src={logo} alt='logo' />
        </NavLink>
    );
};

export default Logo;
