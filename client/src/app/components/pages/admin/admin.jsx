import React, { useEffect, useState } from 'react';
import RoomExBrief from '../../common/roomExBrief/roomExBrief';
import Loader from '../../common/loader/loader';
import { useBookings } from '../../../hooks/useBookings';
import classes from './admin.module.css';

const Admin = () => {
    const [bookingsIds, setBookingsIds] = useState();
    const { getAllBookings } = useBookings();
    useEffect(() => {
        getAllBookings().then((result) => {
            if (result) {
                setBookingsIds(result.map(({ _id }) => _id));
            } else {
                setBookingsIds([]);
            }
        });
    }, []);
    if (bookingsIds) {
        return (
            <>
                <div className='mainTitle'>Панель администратора</div>
                {bookingsIds.length !== 0 ? (
                    <div className={classes.adminWrap}>
                        {bookingsIds.map((item) => (
                            <RoomExBrief key={item} id={item} />
                        ))}
                    </div>
                ) : (
                    <div className={classes.noBookings}>
                        Пока никто ничего не забронировал.
                    </div>
                )}
            </>
        );
    } else {
        return <Loader />;
    }
};

export default Admin;
