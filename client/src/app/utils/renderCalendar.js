import { NUMBER_OF_MONTHS } from '../constants';

export const getMonthDays = (startDate) => {
    const date = new Date(startDate);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthsDays = [];
    const emptyDays = (date.getDay() + 6) % 7;
    for (let i = 1; i <= emptyDays; i += 1) {
        monthsDays.push('');
    }
    let daysNumber;
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        daysNumber = 30;
    } else if (month === 1) {
        if (year % 4 === 0) daysNumber = 29;
        else daysNumber = 28;
    } else daysNumber = 31;
    for (let i = 1; i <= daysNumber; i += 1) {
        date.setDate(i);
        monthsDays.push(Date.parse(date));
    }
    return monthsDays;
};

export const getMonths = () => {
    const date = new Date();
    const months = [];
    for (
        let i = date.getMonth();
        i <= date.getMonth() + NUMBER_OF_MONTHS - 1;
        i += 1
    ) {
        let year = date.getFullYear();
        const month = i % 12;
        if (i > 11) {
            year += 1;
        }
        months.push({
            startDate: Date.parse(new Date(year, month, 1)),
            monthName: getMonthName(month) + ' ' + year
        });
    }
    return months;
};

function getMonthName(month) {
    const arr = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];
    return arr[month];
}

export const getPossibleStartDate = (choiceName, currentDate, checkInDate) => {
    if (choiceName === 'checkIn') {
        return currentDate;
    } else if (choiceName === 'checkOut') {
        if (checkInDate && checkInDate > Date.now()) {
            return checkInDate + 86400000;
        } else {
            return currentDate + 86400000;
        }
    }
};
