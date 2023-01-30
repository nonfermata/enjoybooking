import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    );
                } else if (
                    (currentUser._id !== process.env.REACT_APP_ADMIN &&
                        props.location.pathname === "/admin") ||
                    (currentUser._id === process.env.REACT_APP_ADMIN &&
                        props.location.pathname === "/booking")
                ) {
                    return <Redirect to="/rooms" />;
                } else {
                    return Component ? <Component {...props} /> : children;
                }
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    location: PropTypes.object
};

export default ProtectedRoute;
