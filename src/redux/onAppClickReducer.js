import { createAction } from "@reduxjs/toolkit";

const onClick = createAction("onAppClick");

export const onAppClick = (event) => onClick(event);

const onAppClickReducer = (state = false, action) => {
    switch (action.type) {
        case onClick.type:
            return !state;
        default:
            return state;
    }
};

export default onAppClickReducer;
