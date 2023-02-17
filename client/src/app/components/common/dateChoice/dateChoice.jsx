import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MonthBlock from './monthBlock';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { onAppClicked } from '../../../../redux/onAppClickReducer';
import { getMonths } from '../../../utils/renderCalendar';
import getImpossibleDates from '../../../utils/getImpossibleDates';
import classes from './dateChoice.module.css';

moment.locale('ru');

const DateChoice = ({
    choiceName,
    choiceValue,
    onSetDate,
    checkInDate,
    checkOutDate,
    activeCalendar,
    activateCalendar,
    occupiedDates,
    isStaticCheckIn
}) => {
    const months = getMonths();
    const onAppClick = useSelector(onAppClicked());
    const [monthPosition, setMonthPosition] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    useEffect(() => {
        if (activeCalendar !== choiceName) {
            setShowCalendar(false);
        }
    }, [activeCalendar]);
    useEffect(() => {
        setShowCalendar(false);
    }, [onAppClick]);

    let choiceValueString, dateClass;
    if (!choiceValue) {
        dateClass = classes.choiceInitial;
        choiceValueString =
            choiceName === 'checkIn'
                ? onSetDate
                    ? 'Заезд'
                    : 'Доступные даты'
                : 'Выезд';
    } else {
        dateClass = classes.choiceDate;
        choiceValueString = moment(choiceValue).format('D MMMM, ddd');
    }

    const impossibleDates = getImpossibleDates(
        choiceName,
        checkInDate,
        isStaticCheckIn,
        occupiedDates
    );

    const handleSetDate = (name, date) => {
        if (choiceName === 'checkIn') {
            if (
                date >= checkOutDate ||
                impossibleDates.some(
                    (item) => date < item.from && checkOutDate > item.to
                )
            ) {
                onSetDate(name, date, 'checkOut');
            } else onSetDate(name, date);
        } else if (choiceName === 'checkOut') {
            if (
                impossibleDates.some(
                    (item) => date >= item.to && checkInDate < item.from
                )
            ) {
                onSetDate(name, date, 'checkIn');
            } else onSetDate(name, date);
        }
        setShowCalendar(false);
    };

    const handleMovePosition = (direction) => {
        setMonthPosition((prevState) => prevState + 230 * direction);
    };

    const handleChoice = () => {
        activateCalendar(choiceName);
        setShowCalendar((prevState) => !prevState);
    };
    return (
        <div className={classes.choiceWrap}>
            <div className={dateClass} onClick={handleChoice} id={choiceName}>
                {choiceValueString}
            </div>
            <div
                className={
                    classes.calendarWindow + (showCalendar ? '' : ' hidden')
                }
            >
                <div className={classes.topArrow}></div>
                <div
                    className={classes.calendarWrap}
                    style={{ marginLeft: monthPosition + 'px' }}
                >
                    <div
                        className={
                            classes.leftArrow +
                            (monthPosition === 0 ? ' hidden' : '')
                        }
                        onClick={() => handleMovePosition(1)}
                    >
                        &#9001;
                    </div>
                    <div
                        className={
                            classes.rightArrow +
                            (monthPosition === -(months.length - 2) * 230
                                ? ' hidden'
                                : '')
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
                            handleSetDate={onSetDate ? handleSetDate : false}
                            choiceName={choiceName}
                            impossibleDates={impossibleDates}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
DateChoice.propTypes = {
    choiceValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkInDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkOutDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isStaticCheckIn: PropTypes.bool,
    occupiedDates: PropTypes.array,
    choiceName: PropTypes.string,
    onSetDate: PropTypes.func,
    activeCalendar: PropTypes.string,
    activateCalendar: PropTypes.func
};

export default DateChoice;
