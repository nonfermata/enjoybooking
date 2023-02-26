const getBookingStatus = ({ status, checkIn, checkOut }) => {
    const bookingStatus = {};
    if (status === 'ok') {
        const date = Date.now();
        if (date < checkIn) {
            bookingStatus.name = 'предстоящее';
            bookingStatus.value = 'upcoming';
        } else if (date >= checkIn && date <= checkOut) {
            bookingStatus.name = 'сейчас';
            bookingStatus.value = 'now';
        } else {
            bookingStatus.name = 'завершено';
            bookingStatus.value = 'completed';
        }
    } else if (status === 'userCancelled') {
        bookingStatus.name = 'отменено пользователем';
        bookingStatus.value = 'userCancelled';
    } else {
        bookingStatus.name = 'отменено администратором';
        bookingStatus.value = 'adminCancelled';
    }
    return bookingStatus;
};

export default getBookingStatus;
