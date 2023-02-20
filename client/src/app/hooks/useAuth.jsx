import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/common/loader/loader';
import usersService from '../services/users.service';
import localStorageService from '../services/localStorage.service';
import authService from '../services/auth.service';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    async function getAllUsers() {
        try {
            return await usersService.get();
        } catch (e) {
            errorCatcher(e);
        } finally {
            setIsLoading(false);
        }
    }

    async function getUserData() {
        try {
            const data = await usersService.getCurrentUser();
            await setUser(data);
            if (data) {
                setIsAdmin(data.type === 'admin');
            }
        } catch (e) {
            errorCatcher(e);
        } finally {
            setIsLoading(false);
        }
    }

    async function getUserById(id) {
        try {
            return await usersService.getUserById(id);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    async function signUp(payload) {
        try {
            const data = await authService.register(payload);
            localStorageService.setTokens(data);
            await getUserData();
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким email уже существует.'
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function signIn({ email, password }) {
        try {
            const data = await authService.login(email, password);
            localStorageService.setTokens(data);
            await getUserData();
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                switch (message) {
                    case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
                        throw new Error('Неверная пара e-mail – пароль!');
                    default:
                        throw new Error(
                            'Слишком много попыток входа! Побробуйте позднее.'
                        );
                }
            }
        }
    }

    function updateUserData(data) {
        try {
            usersService.update(data);
            setUser(data);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                logOut,
                currentUser,
                isAdmin,
                updateUserData,
                getUserById,
                getAllUsers
            }}
        >
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
