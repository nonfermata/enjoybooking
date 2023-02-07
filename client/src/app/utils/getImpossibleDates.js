import { getPossibleStartDate } from './renderCalendar';
import { NUMBER_OF_MONTHS } from '../constants';

const getImpossibleDates = (
    choiceName,
    checkInDate,
    isStaticCheckIn,
    occupiedDates
) => {
    const currentDate = new Date();
    const currentDateFloored = Date.parse(currentDate.toDateString());
    const currentMonthFirstDay = Date.parse(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    const arr = [
        {
            from: currentMonthFirstDay,
            to: getPossibleStartDate(
                choiceName,
                currentDateFloored,
                checkInDate
            )
        }
    ];
    const addedDay = choiceName === 'checkOut' ? 86400000 : 0;
    if (isStaticCheckIn && occupiedDates.length !== 0) {
        const nearestBooking = occupiedDates.find(
            (item) => item.checkIn > checkInDate
        );
        const lastDate = Date.parse(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + NUMBER_OF_MONTHS,
                1
            )
        );
        if (nearestBooking) {
            arr.push({
                from: nearestBooking.checkIn + addedDay,
                to: lastDate
            });
        }
    } else {
        occupiedDates.forEach((item) => {
            arr.push({
                from: item.checkIn + addedDay,
                to: item.checkOut + addedDay
            });
        });
    }
    return arr;
};

export default getImpossibleDates;
