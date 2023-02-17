import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../common/button';
import login from '../../../common/svg/login';
import classes from './loginButton.module.css';

const LoginButton = () => {
    return (
        <>
            <NavLink to={'/login'}>
                <div className={classes.icon}>{login}</div>
                <div className={classes.button}>
                    <Button color='blue'>
                        Вход&nbsp;&nbsp;|&nbsp;&nbsp;Регистрация
                    </Button>
                </div>
            </NavLink>
        </>
    );
};

export default LoginButton;
