import React, { useEffect } from 'react';
import Loader from '../../common/loader/loader';
import { useAuth } from '../../../hooks/useAuth';

const Logout = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <Loader />;
};

export default Logout;
