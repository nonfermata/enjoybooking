import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import Button from '../../common/button';
import DateChoice from '../../common/dateChoice/dateChoice';
import SelectField from '../../common/form/selectField';
import SpaceDiv from '../../common/spaceDiv';
import { personsForBooking as persons } from '../../../utils/getSelectFieldList';
import {
    setBooking as setBookingToStore,
    getBooking
} from '../../../../redux/bookingReducer';
import classes from './booking.module.css';
moment.locale('ru');

const Booking = () => {
    const dispatch = useDispatch();
    const [booking, setBooking] = useState(useSelector(getBooking()));
    const [activeCalendar, setActiveCalendar] = useState();
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
    const handleChange = (name, value, reset) => {
        if (reset) {
            setBooking({ ...booking, [name]: value, [reset]: '' });
        } else {
            setBooking({ ...booking, [name]: value });
        }
    };
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalNights = (booking.checkOut - booking.checkIn) / 86400000;
            setBooking({ ...booking, totalNights });
            dispatch(setBookingToStore({ ...booking, totalNights }));
        } else {
            setBooking({ ...booking, totalNights: '' });
            dispatch(setBookingToStore({ ...booking, totalNights: '' }));
        }
    }, [booking.checkIn, booking.checkOut, booking.persons]);

    return (
        <>
            <div className='mainTitle'>Введите данные своей поездки,</div>
            <div className={classes.subtitle}>
                и мы подберем для Вас лучшие номера!
            </div>
            <div className={classes.datesWrap}>
                <DateChoice
                    choiceName='checkIn'
                    choiceValue={booking.checkIn}
                    onSetDate={handleChange}
                    checkOutDate={booking.checkOut}
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
                    occupiedDates={[]}
                />
                <p className={classes.dash}>–</p>
                <DateChoice
                    choiceName='checkOut'
                    choiceValue={booking.checkOut}
                    onSetDate={handleChange}
                    checkInDate={booking.checkIn}
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
                    occupiedDates={[]}
                />
                {booking.totalNights && (
                    <div className={classes.totalNights}>
                        Количество ночей:
                        <span className='fw600'> {booking.totalNights}</span>
                    </div>
                )}
            </div>
            <SelectField
                label='Количество гостей'
                options={persons}
                defaultOption=''
                name='persons'
                value={booking.persons}
                onChange={handleChange}
                style={{
                    padding: '8px 10px',
                    border: '1px solid var(--base-blue-color)',
                    margin: '5px 0 0 10px',
                    fontWeight: '600'
                }}
            />
            <SpaceDiv height='40' />
            <Link to='/rooms'>
                <Button
                    color='blue'
                    disabled={!booking.totalNights || !booking.persons}
                >
                    Выбрать номер
                </Button>
            </Link>
        </>
    );
};

export default Booking;
