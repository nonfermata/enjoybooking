import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import bookingsService from '../services/bookings.service';

const BookingsContext = React.createContext();

export const useBookings = () => useContext(BookingsContext);

const BookingsProvider = ({ children }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getRoomBookings(roomId) {
        try {
            const data = await bookingsService.get();
            if (data) {
                return data.filter((item) => item.roomId === roomId);
            } else {
                return [];
            }
        } catch (e) {
            errorCatcher(e);
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <BookingsContext.Provider value={{ getRoomBookings }}>
            {children}
        </BookingsContext.Provider>
    );
};
BookingsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BookingsProvider;
