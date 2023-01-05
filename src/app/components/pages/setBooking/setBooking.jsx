import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import RoomBrief from "../../ui/roomBrief/roomBrief";
import classes from "./setBooking.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import Button from "../../common/button";
import { useAuth } from "../../../hooks/useAuth";
import TextField from "../../common/form/textField";
import SpaceDiv from "../../common/spaceDiv";
import { useBookings } from "../../../hooks/useBookings";
import { useRooms } from "../../../hooks/useRooms";
import { resetBooking } from "../../../../redux/bookingReducer";

moment.locale("ru");

const SetBooking = ({ booking, resetBooking }) => {
    const history = useHistory();
    useEffect(() => {
        if (Object.values(booking).some((item) => item === "")) {
            history.push("/");
        }
    }, []);
    const { bookings, createBooking } = useBookings();
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const room = useRooms().rooms.find((item) => item._id === roomId);
    const roomBookings = bookings
        ? bookings.filter((item) => item.roomId === roomId)
        : [];
    const errorBookingMessage = () => {
        if (room.capacity < booking.persons) {
            return "Количество человек больше вместимости номера. Измените количество человек или выберите другой номер.";
        }
        for (const item of roomBookings) {
            if (
                item.status === "ok" &&
                booking.checkIn < item.checkOut &&
                booking.checkOut > item.checkIn
            ) {
                return "На выбранные даты этот номер занят. Измените даты поездки или выберите другой номер.";
            }
        }
    };

    const [bookingData, setBookingData] = useState({
        userId: currentUser._id,
        userPhone: "",
        roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        persons: booking.persons
    });

    const handleChange = (name, value) => {
        let newValue = value.length < 3 ? "" : value.replace("+7 ", "");
        newValue = newValue.trim();
        if (isNaN(newValue)) {
            const arr = [];
            for (const i of newValue) {
                if (i !== " " && !isNaN(i)) {
                    arr.push(i);
                }
            }
            newValue = arr.join("");
        }
        setBookingData((prevState) => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmitBooking = async () => {
        const booking = {
            ...bookingData,
            status: "ok",
            _id: String(Date.now())
        };
        try {
            await createBooking(booking);
            resetBooking();
            history.push("/success-booking/" + booking._id);
        } catch (e) {
            console.log(e.message);
        }
    };

    if (!errorBookingMessage()) {
        return (
            <>
                <div className="mainTitle">Вы бронируете номер:</div>
                <div className={classes.setBookingWrap}>
                    <RoomBrief {...room} />
                    <div className={classes.detailsWrap}>
                        <h1 className={classes.title}>Ваша поездка</h1>
                        <p>
                            Заезд:{" "}
                            <span className="fw600">
                                {moment(booking.checkIn).format("D MMMM YYYY")}
                            </span>
                        </p>
                        <p>
                            Выезд:{" "}
                            <span className="fw600">
                                {moment(booking.checkOut).format("D MMMM YYYY")}
                            </span>
                        </p>
                        <p>
                            Количество ночей:{" "}
                            <span className="fw600">{booking.totalDays}</span>
                        </p>
                        <p>
                            Количество человек:{" "}
                            <span className="fw600">{booking.persons}</span>
                        </p>
                        <p>
                            Общая стоимость:{" "}
                            <span className="fw600">
                                {"$" +
                                    Number(booking.totalDays) *
                                        Number(room.price)}
                            </span>
                        </p>
                        <SpaceDiv height="20" />
                        <h1 className={classes.title}>Ваши данные</h1>
                        <p>
                            Имя:
                            <br />
                            <span className="fw600">{currentUser.name}</span>
                        </p>
                        <p>
                            E-mail:
                            <br />
                            <span className="fw600">{currentUser.email}</span>
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                            Контактный телефон:{" "}
                        </p>
                        <TextField
                            name="userPhone"
                            value={"+7 " + bookingData.userPhone}
                            onChange={handleChange}
                            wrapStyle={{ justifyContent: "flex-start" }}
                            inputStyle={{
                                padding: "7px",
                                width: "150px",
                                fontWeight: "600"
                            }}
                        />
                        <Link to="/">
                            <Button color="blue">Изменить бронирование</Button>
                        </Link>
                        <SpaceDiv height="30" />
                        <Button
                            color="green"
                            onClick={handleSubmitBooking}
                            disabled={bookingData.userPhone.length !== 10}
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
                <div className="mainTitle">
                    Данное бронирование, к сожалению, невозможно.
                </div>
                <div className={classes.errorMessage}>
                    {errorBookingMessage()}
                </div>
                <Link to="/">
                    <Button color="blue">Изменить бронирование</Button>
                </Link>
            </>
        );
    }
};
SetBooking.propTypes = {
    booking: PropTypes.object,
    resetBooking: PropTypes.func
};

const mapStateToProps = ({ booking }) => ({
    booking
});

const mapDispatchToProps = { resetBooking };

export default connect(mapStateToProps, mapDispatchToProps)(SetBooking);
