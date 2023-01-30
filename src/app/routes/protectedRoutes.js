import Favourites from "../components/pages/favourites";
import SetBooking from "../components/pages/setBooking";
import Admin from "../components/pages/admin";
import MyBookings from "../components/pages/myBookings";
import SuccessBooking from "../components/pages/successBooking";
import EditProfile from "../components/pages/editProfile";
import EditBooking from "../components/pages/editBooking";
import Booking from "../components/pages/booking/booking";

const protectedRoutes = [
    {
        path: "/my-bookings",
        component: MyBookings
    },
    {
        path: "/favourites",
        component: Favourites
    },
    {
        path: "/admin",
        component: Admin
    },
    {
        path: "/edit-profile",
        component: EditProfile
    },
    {
        path: "/edit-booking/:bookingId",
        component: EditBooking
    },
    {
        path: "/booking",
        component: Booking,
        exact: true
    },
    {
        path: "/set-booking/:roomId",
        component: SetBooking
    },
    {
        path: "/success-booking/:bookingId",
        component: SuccessBooking
    }
];

export default protectedRoutes;
