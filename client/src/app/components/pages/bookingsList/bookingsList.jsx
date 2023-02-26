import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminList from './adminList';
import OrdinaryList from './ordinaryList';
import Loader from '../../common/loader/loader';
import { useAuth } from '../../../hooks/useAuth';
import {
    getDataLoadedStatus,
    loadBookingsToStore
} from '../../../../redux/bookingsReducer';

const BookingsList = () => {
    const { currentUser, isAdmin } = useAuth();
    const dispatch = useDispatch();
    const isDataLoaded = useSelector(getDataLoadedStatus());
    useEffect(() => {
        if (!isDataLoaded) {
            dispatch(loadBookingsToStore(currentUser._id, isAdmin));
        }
    }, []);
    if (!isDataLoaded) {
        return <Loader />;
    }
    return <> {isAdmin ? <AdminList /> : <OrdinaryList />}</>;
};

export default BookingsList;
