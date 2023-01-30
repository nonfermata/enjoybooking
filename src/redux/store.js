import { combineReducers } from "redux";
import bookingReducer from "./bookingReducer";
import onAppClickReducer from "./onAppClickReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    booking: bookingReducer,
    onAppClick: onAppClickReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production"
    });
}
const store = createStore();

export default store;
