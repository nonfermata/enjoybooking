import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import classes from "./favourites.module.css";
import RoomBrief from "../../components/ui/roomBrief/roomBrief";
import PropTypes from "prop-types";

const Favourites = ({ roomsState, isFavouriteChange }) => {
    const [rooms, setRooms] = useState();
    useEffect(() => {
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    }, []);
    const handleFavouriteChange = (id) => {
        isFavouriteChange(id);
        setRooms(roomsState.filter((room) => room.isFavourite === true));
    };

    if (rooms) {
        return (
            <>
                <div className="mainTitle">Избраное</div>
                <div className={classes.roomsWrap}>
                    {rooms.length !== 0 ? (
                        rooms.map((room) => (
                            <RoomBrief
                                key={room._id}
                                parent="favourites"
                                handleFavouriteChange={handleFavouriteChange}
                                {...room}
                            />
                        ))
                    ) : (
                        <div className={classes.noFavourites}>
                            Здесь пока ничего нет :(
                        </div>
                    )}
                </div>
            </>
        );
    }
    return <Loader />;
};
Favourites.propTypes = {
    roomsState: PropTypes.arrayOf(PropTypes.object),
    isFavouriteChange: PropTypes.func
};

export default Favourites;
