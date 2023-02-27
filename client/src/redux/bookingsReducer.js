import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import bookingsService from '../app/services/bookings.service';
import history from '../app/utils/history';

const initialState = {
    entities: [],
    isDataLoaded: false,
    isLoading: false
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        bookingsRequested(state) {
            state.isLoading = true;
        },
        bookingsReceived(state, action) {
            state.entities = action.payload;
            state.isDataLoaded = true;
            state.isLoading = false;
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
            state.entities = [];
            state.isDataLoaded = false;
        }
    }
});

const {
    bookingAdded,
    bookingsReceived,
    bookingUpdated,
    bookingsReset,
    bookingsRequested
} = bookingsSlice.actions;
const bookingsReducer = bookingsSlice.reducer;

export const loadBookingsToStore = (id, isAdmin) => async (dispatch) => {
    dispatch(bookingsRequested());
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
export const createBooking = (booking) => async (dispatch) => {
    try {
        const data = await bookingsService.create(booking);
        dispatch(bookingAdded(data));
        history.push('/success-booking/' + data._id);
    } catch (e) {
        console.log(e.message);
    }
};

export const resetBookings = () => (dispatch) => {
    dispatch(bookingsReset());
};

export const getDataLoadedStatus = () => (state) => state.bookings.isDataLoaded;
export const getBookingsLoadingStatus = () => (state) =>
    state.bookings.isLoading;
export const getBookings = () => (state) => state.bookings.entities;
export const getBookingById = (id) => (state) =>
    state.bookings.entities.find((item) => item._id === id);

export default bookingsReducer;
