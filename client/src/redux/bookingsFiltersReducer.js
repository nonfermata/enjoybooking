import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    current: true,
    completed: true,
    canceled: true
};

const bookingsFiltersSlice = createSlice({
    name: 'bookingsFilters',
    initialState,
    reducers: {
        set(state, action) {
            return { ...action.payload };
        }
    }
});

const { set } = bookingsFiltersSlice.actions;
const bookingsFiltersReducer = bookingsFiltersSlice.reducer;

export const applyBookingsFilters = (bookingsFilters) => set(bookingsFilters);

export const getBookingsFilters = () => (state) => state.bookingsFilters;

export default bookingsFiltersReducer;
