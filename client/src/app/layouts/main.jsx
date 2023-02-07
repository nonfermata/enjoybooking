import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import classes from './main.module.css';
import ProtectedRoute from '../components/common/protectedRoute';
import routes from '../routes/routes';
import protectedRoutes from '../routes/protectedRoutes';

const Main = () => {
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
