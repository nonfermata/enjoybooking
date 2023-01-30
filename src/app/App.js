import React from "react";
import Header from "./components/ui/header/header";
import Main from "./layouts/main";
import RoomsProvider from "./hooks/useRooms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import BookingsProvider from "./hooks/useBookings";
import CookiesMessage from "./utils/cookiesMessage/cookiesMessage";
import isOnAppClicked from "./utils/isOnAppClicked";
import { useDispatch } from "react-redux";
import { onAppClick } from "../redux/onAppClickReducer";
// import RestoreDataBase from "./utils/restoreDataBase";

const App = () => {
    const dispatch = useDispatch();
    const handleAppClick = (event) => {
        if (isOnAppClicked(event)) {
            dispatch(onAppClick());
        }
    };
    return (
        <div
            className="container"
            onClick={() => {
                handleAppClick(event);
            }}>
            <AuthProvider>
                <Header />
                <RoomsProvider>
                    <BookingsProvider>
                        <Main />
                    </BookingsProvider>
                </RoomsProvider>
                <ToastContainer />
                {/*<RestoreDataBase />*/}
            </AuthProvider>
            <CookiesMessage />
        </div>
    );
};

export default App;
