import Rooms from "../components/pages/rooms";
import RoomPage from "../components/pages/roomPage";
import Login from "../components/pages/login";
import Logout from "../components/ui/logout";
import Contacts from "../components/pages/contacts";
import Home from "../components/pages/home";

const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/rooms",
        component: Rooms,
        exact: true
    },
    {
        path: "/rooms/:roomId",
        component: RoomPage
    },
    {
        path: "/contacts",
        component: Contacts
    },
    {
        path: "/logout",
        component: Logout
    },
    {
        path: "/login/:type?",
        component: Login
    }
];

export default routes;
