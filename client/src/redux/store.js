import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookingReducer from './bookingReducer';
import onAppClickReducer from './onAppClickReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
    filters: filtersReducer,
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
