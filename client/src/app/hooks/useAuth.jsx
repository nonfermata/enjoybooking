import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import usersService from '../services/users.service';
import { toast } from 'react-toastify';
import localStorageService, {
    setTokens
} from '../services/localStorage.service';
import Loader from '../components/common/loader/loader';

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
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
            setUser(data);
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

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                ...rest
            });
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

    async function createUser(data) {
        try {
            const content = await usersService.create(data);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                'accounts:signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
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

    async function updateUserData(data) {
        try {
            const content = await usersService.update(data);
            await setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function updateUserFavourites(id) {
        let newFavourites = currentUser.favourites;
        if (newFavourites) {
            if (newFavourites.some((item) => item === id)) {
                newFavourites = currentUser.favourites.filter(
                    (item) => item !== id
                );
            } else newFavourites.push(id);
        } else newFavourites = [id];
        const newUserData = { ...currentUser, favourites: newFavourites };
        try {
            await usersService.update(newUserData);
            setUser(newUserData);
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
                updateUserData,
                updateUserFavourites,
                currentUser,
                getUserById,
                getAllUsers
            }}>
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
