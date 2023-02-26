import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import bookingsService from '../app/services/bookings.service';

const initialState = {
    entities: null,
    isDataLoaded: false
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        bookingsReceived(state, action) {
            state.entities = action.payload;
            state.isDataLoaded = true;
        },
        bookingUpdated(state, action) {
            const bookingIndex = state.entities.findIndex(
                (item) => item._id === action.payload._id
            );
            state.entities[bookingIndex] = action.payload;
        },
        bookingAdded(state, action) {
            const newBookings = [...state.entities, action.payload];
            state.entities = _.orderBy(newBookings, ['checkIn']);
        },
        bookingsReset(state) {
            state.entities = null;
            state.isDataLoaded = false;
        }
    }
});

const { bookingAdded, bookingsReceived, bookingUpdated, bookingsReset } =
    bookingsSlice.actions;
const bookingsReducer = bookingsSlice.reducer;

export const loadBookingsToStore = (id, isAdmin) => async (dispatch) => {
    try {
        const data = await bookingsService.get();
        const bookings = isAdmin
            ? data
            : data.filter((item) => item.userId === id);
        dispatch(bookingsReceived(_.orderBy(bookings, ['checkIn'])));
    } catch (e) {
        console.log(e.message);
    }
};
export const updateBooking = (booking) => async (dispatch) => {
    try {
        const data = await bookingsService.update(booking);
        dispatch(bookingUpdated(data));
    } catch (e) {
        console.log(e.message);
    }
};
export const addBooking = (booking) => async (dispatch) => {
    dispatch(bookingAdded(booking));
};

export const resetBookings = () => (dispatch) => {
    dispatch(bookingsReset());
};

export const getDataLoadedStatus = () => (state) => state.bookings.isDataLoaded;
export const getBookings = () => (state) => state.bookings.entities;
export const getBookingById = (id) => (state) =>
    state.bookings.entities.find((item) => item._id === id);
export default bookingsReducer;
