import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    price: { isActive: false, start_price: '', end_price: '' },
    capacity: { isActive: false, value_capacity: '' },
    kitchen: { isActive: false },
    bathroom: { isActive: false }
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        set(state, action) {
            return { ...action.payload };
        }
    }
});

const { set } = filtersSlice.actions;
const filtersReducer = filtersSlice.reducer;

export const applyFilters = (filters) => set(filters);

export const getFilters = () => (state) => state.filters;

export default filtersReducer;
