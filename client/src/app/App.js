import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Main from './layouts/main';
import Header from './components/ui/header/header';
import RoomsProvider from './hooks/useRooms';
import AuthProvider from './hooks/useAuth';
import BookingsProvider from './hooks/useBookings';
import CookiesMessage from './utils/cookiesMessage/cookiesMessage';
import isOnAppClicked from './utils/isOnAppClicked';
import { onAppClick } from '../redux/onAppClickReducer';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const dispatch = useDispatch();
    const handleAppClick = (event) => {
        if (isOnAppClicked(event)) {
            dispatch(onAppClick());
        }
    };
    return (
        <div
            className='container'
            onClick={() => {
                handleAppClick(event);
            }}
        >
            <AuthProvider>
                <Header />
                <RoomsProvider>
                    <BookingsProvider>
                        <Main />
                    </BookingsProvider>
                </RoomsProvider>
                <ToastContainer />
            </AuthProvider>
            <CookiesMessage />
        </div>
    );
};

export default App;
