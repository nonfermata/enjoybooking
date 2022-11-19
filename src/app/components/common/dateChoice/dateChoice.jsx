import React, { useEffect, useState } from "react";
import { getMonths, getPossibleStartDate } from "../../../utils/renderCalendar";
import classes from "./dateChoice.module.css";
import PropTypes from "prop-types";
import MonthBlock from "./monthBlock";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const DateChoice = ({
    choiceName,
    choiceValue,
    onSetDate,
    checkInDate,
    checkOutDate
}) => {
    let choiceValueString, dateClass;
    if (!choiceValue) {
        dateClass = classes.choiceInitial;
        choiceValueString = choiceName === "checkIn" ? "Заезд" : "Выезд";
    } else {
        dateClass = classes.choiceDate;
        choiceValueString = moment(choiceValue).format("D MMMM, ddd");
    }
    const [possibleStartDate, setPossibleStartDate] = useState();
    const months = getMonths();
    const date = new Date();
    const roundDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    const currentDate = Date.parse(roundDate);
    const nextToCurrentDate = currentDate + 86400000;
    const [monthPosition, setMonthPosition] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);

    document.addEventListener("click", ({ target }) => {
        if (
            !target.className.includes("Arrow") &&
            !target.className.includes("monthName") &&
            !target.className.includes("calendarWrap") &&
            !target.className.includes("calendarWindow") &&
            !target.className.includes("daysGrid") &&
            !target.className.includes("dayNameCell") &&
            !target.className.includes("passiveDayCell") &&
            !target.className.includes("monthWrap") &&
            target.id !== choiceName
        ) {
            setShowCalendar(false);
        }
    });

    useEffect(() => {
        setPossibleStartDate(
            getPossibleStartDate(choiceName, currentDate, checkInDate)
        );
    }, [checkInDate]);

    const handleSetDate = (name, date) => {
        if (date) {
            if (choiceName === "checkIn" && date >= currentDate) {
                if (date >= checkOutDate) {
                    onSetDate(name, date, "checkOutReset");
                } else onSetDate(name, date);
            } else if (choiceName === "checkOut" && date >= nextToCurrentDate) {
                if (!checkInDate) {
                    onSetDate(name, date);
                } else {
                    if (date > checkInDate) {
                        onSetDate(name, date);
                    }
                }
            }
        }
    };

    const handleMovePosition = (direction) => {
        setMonthPosition((prevState) => prevState + 230 * direction);
    };
    const handleChoice = () => {
        setShowCalendar((prevState) => !prevState);
    };
    return (
        <div className={classes.choiceWrap}>
            <div
                className={dateClass}
                onClick={handleChoice}
                id={choiceName}
            >
                {choiceValueString}
            </div>
            <div
                className={
                    classes.calendarWindow + (showCalendar ? "" : " hidden")
                }
            >
                <div className={classes.topArrow}></div>
                <div
                    className={classes.calendarWrap}
                    style={{ marginLeft: monthPosition + "px" }}
                >
                    <div
                        className={
                            classes.leftArrow +
                            (monthPosition === 0 ? " hidden" : "")
                        }
                        onClick={() => handleMovePosition(1)}
                    >
                        &#9001;
                    </div>
                    <div
                        className={
                            classes.rightArrow +
                            (monthPosition === -(months.length - 2) * 230
                                ? " hidden"
                                : "")
                        }
                        onClick={() => handleMovePosition(-1)}
                    >
                        &#9002;
                    </div>
                    {months.map((month) => (
                        <MonthBlock
                            key={month.monthName}
                            monthName={month.monthName}
                            startDate={month.startDate}
                            handleSetDate={handleSetDate}
                            choiceName={choiceName}
                            possibleStartDate={possibleStartDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
DateChoice.propTypes = {
    choiceName: PropTypes.string,
    choiceValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkInDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkOutDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onSetDate: PropTypes.func
};

export default DateChoice;