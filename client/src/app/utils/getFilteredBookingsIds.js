const getFilteredBookingsIds = (bookings, filters) => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    return bookings
        .filter(({ status, checkOut }) => {
            for (const item of activeFilters) {
                switch (item) {
                    case 'canceled':
                        if (status !== 'ok') {
                            return true;
                        }
                        break;
                    case 'completed':
                        if (status === 'ok' && Date.now() > checkOut) {
                            return true;
                        }
                        break;
                    case 'current':
                        if (status === 'ok' && Date.now() < checkOut) {
                            return true;
                        }
                        break;
                }
            }
            return false;
        })
        .map((item) => item._id);
};

export default getFilteredBookingsIds;
