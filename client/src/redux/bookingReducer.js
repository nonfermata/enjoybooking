import { createSlice } from '@reduxjs/toolkit';

const initialState = { persons: '' };

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        set(state, action) {
            return { ...action.payload };
        },
        reset() {
            return initialState;
        }
    }
});

const { set, reset } = bookingSlice.actions;
const bookingReducer = bookingSlice.reducer;

export const setBooking = (booking) => set(booking);
export const resetBooking = () => reset();

export const getBooking = () => (state) => state.booking;

export default bookingReducer;
