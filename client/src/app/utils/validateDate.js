const validateDate = (date) => {
    let day = date.day;
    const month = date.month;
    const year = date.year;
    if (
        day === 31 &&
        (month === 4 || month === 6 || month === 9 || month === 11)
    ) {
        day = 30;
    }
    if (day > 28 && month === 2) {
        if (year % 4 === 0) {
            day = 29;
        } else {
            day = 28;
        }
    }
    return day;
};

export default validateDate;
