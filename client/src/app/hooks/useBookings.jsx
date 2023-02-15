import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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

    async function getAllBookings() {
        try {
            const data = await bookingsService.get();
            return _.orderBy(data, ['checkIn']);
        } catch (e) {
            errorCatcher(e);
        }
    }

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

    async function getUserBookings(userId) {
        try {
            const data = await bookingsService.get();
            if (data) {
                const filteredData = data.filter(
                    (item) => item.userId === userId
                );
                return _.orderBy(filteredData, ['checkIn']);
            } else {
                return [];
            }
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getBookingById(id) {
        try {
            const data = await bookingsService.get();
            return data.find((item) => item._id === id);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function createBooking(data) {
        try {
            return await bookingsService.create(data);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function updateBooking(data) {
        try {
            await bookingsService.update(data);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <BookingsContext.Provider
            value={{
                getAllBookings,
                getBookingById,
                getRoomBookings,
                getUserBookings,
                createBooking,
                updateBooking
            }}
        >
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
