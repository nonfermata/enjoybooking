import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SignUp from './signUp';
import SignIn from './signIn';
import classes from './login.module.css';

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === 'register' ? 'login' : 'register'
        );
    };
    return (
        <>
            {formType === 'register' ? (
                <>
                    <SignUp />
                    <p className={classes.toggleQuestion}>
                        Уже есть аккаунт?{' '}
                        <a
                            className={classes.toggleFormLink}
                            onClick={toggleFormType}
                        >
                            Войти
                        </a>
                    </p>
                </>
            ) : (
                <>
                    <SignIn />
                    <p className={classes.toggleQuestion}>
                        Нет аккаунта?{' '}
                        <a
                            className={classes.toggleFormLink}
                            onClick={toggleFormType}
                        >
                            Зарегистрироваться
                        </a>
                    </p>
                </>
            )}
        </>
    );
};

export default Login;
