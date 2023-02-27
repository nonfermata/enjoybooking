import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../common/button';
import TextField from '../../common/form/textField';
import { useAuth } from '../../../hooks/useAuth';
import validator from '../../../utils/validator';
import { loadBookingsToStore } from '../../../../redux/bookingsReducer';
import classes from './login.module.css';

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { signIn } = useAuth();
    const initialState = {
        email: '',
        password: ''
    };
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(false);

    const handleChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setEnterError(false);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'E-mail обязателен для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const onSignIn = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        try {
            const user = await signIn(data);
            dispatch(loadBookingsToStore(user._id, user.type === 'admin'));
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : '/booking'
            );
        } catch (e) {
            setEnterError(e.message);
        }
    };

    return (
        <form onSubmit={onSignIn}>
            <div className={classes.formContainer}>
                <p className={classes.title}>Вход</p>
                <div className={classes.inputWrap}>
                    <TextField
                        name='email'
                        value={data.email}
                        onChange={handleChangeData}
                        placeholder='Введите e-mail'
                        error={errors.email}
                    />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        type='password'
                        name='password'
                        value={data.password}
                        error={errors.password}
                        onChange={handleChangeData}
                        placeholder='Введите пароль'
                    />
                </div>
                {enterError && (
                    <p className={classes.enterError}>{enterError}</p>
                )}
                <Button color='blue' disabled={!isValid || Boolean(enterError)}>
                    Войти
                </Button>
            </div>
        </form>
    );
};

export default SignIn;
