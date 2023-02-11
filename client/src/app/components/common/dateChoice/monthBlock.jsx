/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { getMonthDays } from '../../../utils/renderCalendar';
import classes from './dateChoice.module.css';

const MonthBlock = ({
    monthName,
    startDate,
    handleSetDate,
    choiceName,
    impossibleDates
}) => {
    const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const checkDate = (date) => {
        return !impossibleDates.some(
            (item) => date >= item.from && date < item.to
        );
    };

    function getDayNumber(date) {
        const newDate = new Date(date);
        return newDate.getDate();
    }
    return (
        <div className={classes.monthWrap}>
            <div className={classes.monthName}>{monthName}</div>
            <div className={classes.daysGrid}>
                {week.map((item, index) => (
                    <div key={index} className={classes.dayNameCell}>
                        <>{item}</>
                    </div>
                ))}
                {getMonthDays(startDate).map((date, index) => (
                    <button
                        disabled={!checkDate(date)}
                        key={index}
                        onClick={
                            handleSetDate
                                ? () => handleSetDate(choiceName, date)
                                : () => {}
                        }
                        className={
                            (checkDate(date)
                                ? handleSetDate
                                    ? classes.normalDayCell
                                    : classes.staticDayCell
                                : classes.passiveDayCell) +
                            (date ? '' : ' invisible')
                        }
                    >
                        <>{date && getDayNumber(date)}</>
                    </button>
                ))}
            </div>
        </div>
    );
};
MonthBlock.propTypes = {
    monthName: PropTypes.string,
    startDate: PropTypes.number,
    handleSetDate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    choiceName: PropTypes.string,
    impossibleDates: PropTypes.array
};

export default MonthBlock;
