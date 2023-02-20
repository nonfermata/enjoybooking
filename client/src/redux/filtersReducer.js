import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: null,
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
