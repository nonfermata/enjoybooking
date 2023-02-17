import React from 'react';
import { useParams } from 'react-router-dom';
import RoomExBrief from '../../common/roomExBrief/roomExBrief';

const SuccessBooking = () => {
    const { bookingId } = useParams();
    return (
        <>
            <div className='mainTitle green'>
                Поздравляем, <span className='no_wrap'>Ваше бронирование</span>{' '}
                подтверждено!
            </div>
            <RoomExBrief id={bookingId} />
        </>
    );
};

export default SuccessBooking;
