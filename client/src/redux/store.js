import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookingReducer from './bookingReducer';
import bookingsReducer from './bookingsReducer';
import onAppClickReducer from './onAppClickReducer';
import roomsFiltersReducer from './roomsFiltersReducer';
import bookingsFiltersReducer from './bookingsFiltersReducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    bookings: bookingsReducer,
    roomsFilters: roomsFiltersReducer,
    bookingsFilters: bookingsFiltersReducer,
    onAppClick: onAppClickReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production'
    });
}
const store = createStore();

export default store;
