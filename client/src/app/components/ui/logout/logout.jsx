import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../common/loader/loader';
import { useAuth } from '../../../hooks/useAuth';
import { resetBookings } from '../../../../redux/bookingsReducer';

const Logout = () => {
    const dispatch = useDispatch();
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
        dispatch(resetBookings());
    }, []);
    return <Loader />;
};

export default Logout;
