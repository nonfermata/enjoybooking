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

// const bookingReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(set, (state, action) => {
//             return { ...action.payload };
//         })
//         .addCase(reset, () => {
//             return initialState;
//         });
// });

export default bookingReducer;
