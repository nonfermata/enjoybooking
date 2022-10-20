import React from "react";
import classes from "./main.module.css";
import { Route } from "react-router-dom";
import Rooms from "./rooms/rooms";
import Favourites from "./favourites/favourites";
import Admin from "./admin/admin";
import SignIn from "./signIn-signUp/signIn";
import SignUp from "./signIn-signUp/signUp";

const Main = () => {
    return (
        <div className={classes.mainContentBlock}>
            <Route path="/rooms" component={Rooms} />
            {/* <Route path="/rooms/:roomId" component={}/> */}
            <Route path="/favourites" component={Favourites} />
            <Route path="/admin" component={Admin} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
        </div>
    );
};

export default Main;
