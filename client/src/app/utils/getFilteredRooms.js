const getFilteredRooms = (rooms, filters) => {
    const activeFilters = Object.keys(filters).filter(
        (item) => filters[item].isActive
    );
    return rooms.filter((room) => {
        const startPrice = filters.price.start_price;
        let endPrice = filters.price.end_price;
        for (const item of activeFilters) {
            switch (item) {
                case 'capacity':
                    if (room.capacity < filters.capacity.value_capacity) {
                        return false;
                    }
                    break;
                case 'price':
                    if (endPrice === '') {
                        endPrice = 100000;
                    }
                    if (room.price < startPrice || room.price > endPrice) {
                        return false;
                    }
                    break;
                default:
                    if (!room[item]) return false;
            }
        }
        return true;
    });
};

export default getFilteredRooms;
