import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../../components/common/protectedRoute';
import Loader from '../../components/common/loader/loader';
import { useAuth } from '../../hooks/useAuth';
import localStorageService from '../../services/localStorage.service';
import {
    getBookingsLoadingStatus,
    loadBookingsToStore
} from '../../../redux/bookingsReducer';
import routes from '../../routes/routes';
import protectedRoutes from '../../routes/protectedRoutes';
import classes from './main.module.css';

const Main = () => {
    const dispatch = useDispatch();
    const isBookingsLoading = useSelector(getBookingsLoadingStatus());
    const { isAdmin } = useAuth();
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            dispatch(
                loadBookingsToStore(localStorageService.getUserId(), isAdmin)
            );
        }
    }, []);

    if (isBookingsLoading) {
        return <Loader />;
    }
    return (
        <div className={classes.mainContentBlock}>
            <Switch>
                {routes.map((prop, key) => (
                    <Route
                        key={key}
                        path={prop.path}
                        component={prop.component}
                        exact={prop.exact}
                    />
                ))}
                {protectedRoutes.map((prop, key) => (
                    <ProtectedRoute
                        key={key}
                        path={prop.path}
                        component={prop.component}
                    />
                ))}
                <Redirect to='/home' />
            </Switch>
        </div>
    );
};

export default Main;
