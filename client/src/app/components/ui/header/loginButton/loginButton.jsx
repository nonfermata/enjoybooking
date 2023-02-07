import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../common/button';

const LoginButton = () => {
    return (
        <Button color='blue'>
            <NavLink to={'/login'}>
                Вход&nbsp;&nbsp;|&nbsp;&nbsp;Регистрация
            </NavLink>
        </Button>
    );
};

export default LoginButton;
