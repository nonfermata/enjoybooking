import React, { useEffect, useState } from "react";
import classes from "./booking.module.css";
import DateChoice from "../../common/dateChoice/dateChoice";
import Button from "../../common/button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { setBooking } from "../../../../redux/bookingReducer";
import { personsForBooking as persons } from "../../../utils/selectFieldData";
import SelectField from "../../common/form/selectField";
import SpaceDiv from "../../common/spaceDiv";
import "moment/locale/ru";
moment.locale("ru");

const Booking = ({ booking: bookingState, setBooking: setBookingToStore }) => {
    const [booking, setBooking] = useState(bookingState);
    const [activeCalendar, setActiveCalendar] = useState();
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
    const handleChange = (name, value, checkOutReset) => {
        if (checkOutReset) {
            setBooking({ ...booking, [name]: value, checkOut: "" });
        } else {
            setBooking({ ...booking, [name]: value });
        }
    };
    useEffect(() => {
        if (booking.checkIn && booking.checkOut) {
            const totalDays = (booking.checkOut - booking.checkIn) / 86400000;
            setBooking({ ...booking, totalDays });
        } else {
            setBooking({ ...booking, totalDays: "" });
        }
        setBookingToStore(booking);
    }, [booking.checkIn, booking.checkOut, booking.persons]);

    return (
        <>
            <div className="mainTitle">Введите данные своей поездки,</div>
            <div className={classes.subtitle}>
                и мы подберем для Вас лучшие номера!
            </div>
            <div className={classes.bookingFormWrap}>
                <DateChoice
                    choiceName="checkIn"
                    choiceValue={booking.checkIn}
                    onSetDate={handleChange}
                    checkOutDate={booking.checkOut}
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
                />
                <p>–</p>
                <DateChoice
                    choiceName="checkOut"
                    choiceValue={booking.checkOut}
                    onSetDate={handleChange}
                    checkInDate={booking.checkIn}
                    activeCalendar={activeCalendar}
                    activateCalendar={activateCalendar}
                />
                {booking.totalDays && (
                    <div className={classes.totalDays}>
                        Количество ночей:
                        <span className="fw600"> {booking.totalDays}</span>
                    </div>
                )}
            </div>
            <SpaceDiv height="30" />
            <SelectField
                label="Количество человек"
                options={persons}
                defaultOption=""
                name="persons"
                value={booking.persons}
                onChange={handleChange}
                style={{
                    padding: "8px 10px",
                    border: "1px solid var(--header-bg-color)",
                    margin: "5px 0 0 10px",
                    fontWeight: "600"
                }}
            />
            <SpaceDiv height="40" />
            <Link to="/rooms">
                <Button
                    color="blue"
                    disabled={!booking.totalDays || !booking.persons}
                >
                    Выбрать номер
                </Button>
            </Link>
        </>
    );
};
Booking.propTypes = {
    booking: PropTypes.object,
    setBooking: PropTypes.func
};

const mapStateToProps = ({ booking }) => ({
    booking
});

const mapDispatchToProps = { setBooking };

export default connect(mapStateToProps, mapDispatchToProps)(Booking);