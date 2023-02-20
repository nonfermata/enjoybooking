import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import RoomBrief from '../../common/roomBrief/roomBrief';
import Button from '../../common/button';
import Loader from '../../common/loader/loader';
import TextField from '../../common/form/textField';
import SpaceDiv from '../../common/spaceDiv';
import { useBookings } from '../../../hooks/useBookings';
import { useAuth } from '../../../hooks/useAuth';
import { useRooms } from '../../../hooks/useRooms';
import { resetBooking } from '../../../../redux/bookingReducer';
import changePhone from '../../../utils/changePhone';
import classes from './setBooking.module.css';

moment.locale('ru');

const SetBooking = () => {
    const [userPhone, setUserPhone] = useState('');
    const dispatch = useDispatch();
    const booking = useSelector((state) => state.booking);
    const history = useHistory();
    const { currentUser: user } = useAuth();
    const { roomId } = useParams();
    const room = useRooms().getRoomById(roomId);
    const { getRoomBookings, createBooking } = useBookings();
    const [roomBookings, setRoomBookings] = useState();
    useEffect(() => {
        if (Object.values(booking).some((item) => item === '')) {
            history.push('/booking');
        }
        getRoomBookings(roomId).then((result) => setRoomBookings(result));
    }, []);

    const errorBookingMessage = () => {
        if (room.capacity < booking.persons) {
            return 'Количество человек больше вместимости номера. Измените количество человек или выберите другой номер.';
        }
        for (const item of roomBookings) {
            if (
                item.status === 'ok' &&
                booking.checkIn < item.checkOut &&
                booking.checkOut > item.checkIn
            ) {
                return 'На выбранные даты этот номер занят. Измените даты поездки или выберите другой номер.';
            }
        }
    };

    const handleChangePhone = (name, value) => {
        setUserPhone(changePhone(value));
    };

    const handleSubmitBooking = async () => {
        const data = {
            ...booking,
            roomId,
            userPhone,
            status: 'ok'
        };
        try {
            const booking = await createBooking(data);
            dispatch(resetBooking());
            history.push('/success-booking/' + booking._id);
        } catch (e) {
            console.log(e.message);
        }
    };
    if (roomBookings) {
        if (!errorBookingMessage()) {
            return (
                <>
                    <div className='mainTitle'>Вы бронируете номер:</div>
                    <div className={classes.setBookingWrap}>
                        <RoomBrief {...room} />
                        <div className={classes.detailsWrap}>
                            <h1 className={classes.title}>Ваша поездка</h1>
                            <p>
                                Заезд:{' '}
                                <span className='fw600'>
                                    {moment(booking.checkIn).format(
                                        'D MMMM YYYY'
                                    )}
                                </span>
                            </p>
                            <p>
                                Выезд:{' '}
                                <span className='fw600'>
                                    {moment(booking.checkOut).format(
                                        'D MMMM YYYY'
                                    )}
                                </span>
                            </p>
                            <p>
                                Количество человек:{' '}
                                <span className='fw600'>{booking.persons}</span>
                            </p>
                            <p>
                                Цена за ночь:{' '}
                                <span className='fw600'>
                                    {'$' + room.price}
                                </span>
                            </p>
                            <p>
                                Количество ночей:{' '}
                                <span className='fw600'>
                                    {booking.totalNights}
                                </span>
                            </p>
                            <p>
                                Общая стоимость:{' '}
                                <span className='fw600'>
                                    {'$' +
                                        Number(booking.totalNights) *
                                            Number(room.price)}
                                </span>
                            </p>
                            <SpaceDiv height='20' />
                            <h1 className={classes.title}>Ваши данные</h1>
                            <p>
                                Имя:
                                <br />
                                <span className='fw600'>{user.name}</span>
                            </p>
                            <p>
                                E-mail:
                                <br />
                                <span className='fw600'>{user.email}</span>
                            </p>
                            <p style={{ marginBottom: '5px' }}>
                                Контактный телефон:{' '}
                            </p>
                            <div className={classes.inputWrap}>
                                <TextField
                                    name='userPhone'
                                    value={'+7 ' + userPhone}
                                    onChange={handleChangePhone}
                                    inputStyle={{
                                        padding: '7px',
                                        width: '150px',
                                        fontWeight: '600'
                                    }}
                                />
                            </div>
                            <Link to='/booking'>
                                <Button color='blue'>
                                    Изменить бронирование
                                </Button>
                            </Link>
                            <SpaceDiv height='30' />
                            <Button
                                color='green'
                                onClick={handleSubmitBooking}
                                disabled={userPhone.length !== 10}
                            >
                                Подтвердить бронирование
                            </Button>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className='mainTitle'>
                        Данное бронирование, к сожалению, невозможно.
                    </div>
                    <div className={classes.errorMessage}>
                        {errorBookingMessage()}
                    </div>
                    <Link to='/booking'>
                        <Button color='blue'>Изменить бронирование</Button>
                    </Link>
                </>
            );
        }
    } else {
        return <Loader />;
    }
};

export default SetBooking;
