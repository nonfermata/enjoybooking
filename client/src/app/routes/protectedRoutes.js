import Favourites from '../components/pages/favourites';
import SetBooking from '../components/pages/setBooking';
import SuccessBooking from '../components/pages/successBooking';
import EditProfile from '../components/pages/editProfile';
import EditBooking from '../components/pages/editBooking';
import Booking from '../components/pages/booking/booking';
import BookingsList from '../components/pages/bookingsList';

const protectedRoutes = [
    {
        path: '/my-bookings',
        component: BookingsList
    },
    {
        path: '/favourites',
        component: Favourites
    },
    {
        path: '/admin',
        component: BookingsList
    },
    {
        path: '/edit-profile',
        component: EditProfile
    },
    {
        path: '/edit-booking/:bookingId',
        component: EditBooking
    },
    {
        path: '/booking',
        component: Booking,
        exact: true
    },
    {
        path: '/set-booking/:roomId',
        component: SetBooking
    },
    {
        path: '/success-booking/:bookingId',
        component: SuccessBooking
    }
];

export default protectedRoutes;
