import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookingReducer from './bookingReducer';
import onAppClickReducer from './onAppClickReducer';

const rootReducer = combineReducers({
    booking: bookingReducer,
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
