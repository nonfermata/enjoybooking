import React from 'react';
import AdminList from './adminList';
import OrdinaryList from './ordinaryList';
import { useAuth } from '../../../hooks/useAuth';

const BookingsList = () => {
    const { isAdmin } = useAuth();
    return <> {isAdmin ? <AdminList /> : <OrdinaryList />}</>;
};

export default BookingsList;
