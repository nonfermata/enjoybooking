import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    price: { isActive: false, start_price: '', end_price: '' },
    capacity: { isActive: false, value_capacity: '' },
    kitchen: { isActive: false },
    bathroom: { isActive: false }
};

const roomsFiltersSlice = createSlice({
    name: 'roomsFilters',
    initialState,
    reducers: {
        set(state, action) {
            return { ...action.payload };
        }
    }
});

const { set } = roomsFiltersSlice.actions;
const roomsFiltersReducer = roomsFiltersSlice.reducer;

export const applyRoomsFilters = (roomsFilters) => set(roomsFilters);

export const getRoomsFilters = () => (state) => state.roomsFilters;

export default roomsFiltersReducer;
