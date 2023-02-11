import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomExBrief from '../../common/roomExBrief/roomExBrief';
import Loader from '../../common/loader/loader';
import { useBookings } from '../../../hooks/useBookings';

const SuccessBooking = () => {
    const [booking, setBooking] = useState();
    const { bookingId } = useParams();
    const { getBookingById } = useBookings();
    useEffect(() => {
        getBookingById(bookingId).then((result) => setBooking(result));
    }, []);

    if (booking) {
        return (
            <>
                <div className='mainTitle green'>
                    Поздравляем, Ваше бронирование подтверждено!
                </div>
                <RoomExBrief id={booking._id} />
            </>
        );
    } else {
        return <Loader />;
    }
};

export default SuccessBooking;
