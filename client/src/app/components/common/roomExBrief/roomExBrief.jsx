import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import PopupSubmit from '../popupSubmit/popupSubmit';
import SkeletonCard from '../skeleton/skeletonCard';
import { useRooms } from '../../../hooks/useRooms';
import { useAuth } from '../../../hooks/useAuth';
import getWordByNumber from '../../../utils/getWordByNumber';
import getBookingStatus from '../../../utils/getBookingStatus';
import {
    getBookingById,
    updateBooking
} from '../../../../redux/bookingsReducer';
import classes from './roomExBrief.module.css';
moment.locale('ru');

const RoomExBrief = ({ id }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const booking = useSelector(getBookingById(id));
    const [isPopup, setIsPopup] = useState(false);
    const { getUserById } = useAuth();
    const { getRoomById } = useRooms();
    const { isAdmin } = useAuth();

    useEffect(() => {
        getUserById(booking.userId).then((result) => setUser(result));
    }, []);

    const handleCancelBooking = () => {
        setIsPopup(true);
    };

    const onSubmitCancellation = () => {
        const data = {
            ...booking,
            status: isAdmin ? 'adminCancelled' : 'userCancelled'
        };
        dispatch(updateBooking(data));
        setIsPopup(false);
        toast.info('Бронирование отменено', {
            position: 'top-right'
        });
    };

    const onExit = () => {
        setIsPopup(false);
    };
    if (!user) {
        return <SkeletonCard />;
    }
    const room = getRoomById(booking.roomId);
    const totalNights = (booking.checkOut - booking.checkIn) / 86400000;
    const statusObject = getBookingStatus(booking);
    const isEditable =
        statusObject.value === 'upcoming' || statusObject.value === 'now';
    return (
        <div className={classes.bookingWrap}>
            <div className={classes.status + ' ' + classes[statusObject.value]}>
                {statusObject.name}
            </div>
            <div className={classes.datesAndPersonsWrap}>
                <div className={classes.dates}>
                    {moment(booking.checkIn).format('DD.MM.YYYY') +
                        ' - ' +
                        moment(booking.checkOut).format('DD.MM.YYYY')}
                </div>
                <p className={classes.separator}>|</p>
                <div className={classes.persons}>
                    {booking.persons}{' '}
                    {getWordByNumber(Number(booking.persons), 'guests')}
                </div>
                <p className={classes.separator}>|</p>
                <div className={classes.price}>
                    <span className='fw600'>${room.price * totalNights}</span>{' '}
                    за {totalNights} {getWordByNumber(totalNights, 'nights')}
                </div>
            </div>
            <div className={classes.imgAndDecrWrap}>
                <div className={classes.imgWrap}>
                    <img
                        className={classes.image}
                        src={room.mainPhoto}
                        alt='photo'
                    />
                </div>
                <div className={classes.description}>
                    <Link to={`rooms/${room._id}`}>
                        <h1 className={classes.roomTitle}>{room.name}</h1>
                    </Link>
                    {isAdmin && (
                        <>
                            <h2 className={classes.userTitle}>
                                Контактное лицо:
                            </h2>
                            <p className={classes.userItem}>
                                Имя: <span className='fw600'>{user.name}</span>
                            </p>
                            <p className={classes.userItem}>
                                E-mail:{' '}
                                <span className='fw600'>{user.email}</span>
                            </p>
                            <p className={classes.userItem}>
                                Телефон:{' '}
                                <span className='fw600'>
                                    {'+7 ' + booking.userPhone}
                                </span>
                            </p>
                        </>
                    )}
                    {isEditable && (
                        <div className={classes.editWrap}>
                            <Link to={'/edit-booking/' + id}>
                                <p
                                    className={classes.editBooking}
                                    title='Редактировать'
                                >
                                    Внести изменения
                                </p>
                            </Link>
                            <p
                                className={classes.cancelBooking}
                                title='Отменить бронирование'
                                onClick={handleCancelBooking}
                            >
                                Отменить бронирование
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {isPopup && (
                <PopupSubmit onSubmit={onSubmitCancellation} onExit={onExit}>
                    Вы уверены, что хотите отменить это бронирование?
                </PopupSubmit>
            )}
        </div>
    );
};

RoomExBrief.propTypes = {
    id: PropTypes.string
};

export default RoomExBrief;
