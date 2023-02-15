import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/ru';
import PopupSubmit from '../popupSubmit/popupSubmit';
import { useBookings } from '../../../hooks/useBookings';
import { useRooms } from '../../../hooks/useRooms';
import { useAuth } from '../../../hooks/useAuth';
import getWordByNumber from '../../../utils/getWordByNumber';
import classes from './roomExBrief.module.css';
import SkeletonCard from '../skeleton/skeletonCard';
moment.locale('ru');

const RoomExBrief = ({ id }) => {
    const [user, setUser] = useState();
    const [booking, setBooking] = useState();
    const [isPopup, setIsPopup] = useState(false);
    const { getBookingById, updateBooking } = useBookings();
    const { getUserById } = useAuth();
    const { getRoomById } = useRooms();
    const { currentUser } = useAuth();
    const isAdmin = currentUser._id === process.env.REACT_APP_ADMIN;

    useEffect(() => {
        getBookingById(id).then((result) => setBooking(result));
    }, []);

    useEffect(() => {
        if (booking) {
            getUserById(booking.userId).then((result) => setUser(result));
        }
    }, [booking]);

    const handleCancelBooking = () => {
        setIsPopup(true);
    };

    const onSubmitCancellation = () => {
        const data = {
            ...booking,
            status: isAdmin ? 'adminCancelled' : 'userCancelled'
        };
        updateBooking(data);
        setBooking(data);
        setIsPopup(false);
        toast.info('Бронирование отменено', {
            position: 'top-right'
        });
    };

    const onExit = () => {
        setIsPopup(false);
    };

    if (user && booking) {
        const room = getRoomById(booking.roomId);
        const totalNights = (booking.checkOut - booking.checkIn) / 86400000;
        const extStatus = {};
        if (booking.status === 'ok') {
            const date = Date.now();
            if (date < booking.checkIn) {
                extStatus.name = 'предстоящее';
                extStatus.value = 'upcoming';
            } else if (date >= booking.checkIn && date <= booking.checkOut) {
                extStatus.name = 'сейчас';
                extStatus.value = 'now';
            } else {
                extStatus.name = 'завершено';
                extStatus.value = 'completed';
            }
        } else if (booking.status === 'userCancelled') {
            extStatus.name = 'отменено пользователем';
            extStatus.value = 'userCancelled';
        } else {
            extStatus.name = 'отменено администратором';
            extStatus.value = 'adminCancelled';
        }
        const isEdit =
            extStatus.value === 'upcoming' || extStatus.value === 'now';
        return (
            <div className={classes.bookingWrap}>
                <div
                    className={classes.status + ' ' + classes[extStatus.value]}
                >
                    {extStatus.name}
                </div>
                <div className={classes.datesAndPersonsWrap}>
                    <div className={classes.dates}>
                        {moment(booking.checkIn).format('DD.MM.YYYY') +
                            ' - ' +
                            moment(booking.checkOut).format('DD.MM.YYYY')}
                    </div>
                    |
                    <div className={classes.persons}>
                        {booking.persons}{' '}
                        {getWordByNumber(Number(booking.persons), 'guests')}
                    </div>
                    |
                    <div className={classes.price}>
                        <span className='fw600'>
                            ${room.price * totalNights}
                        </span>{' '}
                        за {totalNights}{' '}
                        {getWordByNumber(totalNights, 'nights')}
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
                        <h1 className={classes.roomTitle}>{room.name}</h1>
                        {isAdmin && (
                            <>
                                <h2 className={classes.userTitle}>
                                    Контактное лицо:
                                </h2>
                                <p className={classes.userItem}>
                                    Имя:{' '}
                                    <span className='fw600'>{user.name}</span>
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
                        {isEdit && (
                            <div className={classes.editWrap}>
                                <Link to={'/edit-booking/' + id}>
                                    <p
                                        className={
                                            classes.edit +
                                            ' ' +
                                            classes.editBooking
                                        }
                                        title='Редактировать'
                                    >
                                        Внести изменения
                                    </p>
                                </Link>
                                <p
                                    className={
                                        classes.edit +
                                        ' ' +
                                        classes.cancelBooking
                                    }
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
                    <PopupSubmit
                        onSubmit={onSubmitCancellation}
                        onExit={onExit}
                    >
                        Вы уверены, что хотите отменить это бронирование?
                    </PopupSubmit>
                )}
            </div>
        );
    } else {
        return <SkeletonCard />;
    }
};

RoomExBrief.propTypes = {
    id: PropTypes.string
};

export default RoomExBrief;
