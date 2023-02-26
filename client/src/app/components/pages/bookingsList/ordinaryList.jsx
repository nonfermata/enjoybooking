import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RoomExBrief from '../../common/roomExBrief/roomExBrief';
import BookingsFilters from '../../common/filters/bookingsFilters';
import getFilteredBookingsIds from '../../../utils/getFilteredBookingsIds';
import { getBookings } from '../../../../redux/bookingsReducer';
import { getBookingsFilters } from '../../../../redux/bookingsFiltersReducer';
import cross from '../../common/svg/cross';
import classes from './bookingsList.module.css';

const OrdinaryList = () => {
    const [filtersClass, setFiltersClass] = useState('hidden');
    const bookings = useSelector(getBookings());
    const filters = useSelector(getBookingsFilters());
    const filteredIds = getFilteredBookingsIds(bookings, filters);
    const isAllFilters = filteredIds.length === bookings.length;
    const filtersTitleStyle = !isAllFilters
        ? { fontWeight: '500', color: 'var(--orange-color' }
        : {};
    return (
        <>
            <div className={classes.filtersBlock}>
                <div
                    className={classes.filtersBlockTitle}
                    onClick={() => setFiltersClass('')}
                    style={filtersTitleStyle}
                >
                    Фильтры
                </div>
                <div className={classes.filtersWrap + ' ' + filtersClass}>
                    <div className={classes.closeFiltersWrap}>
                        <div
                            className={classes.closeFilters}
                            onClick={() => setFiltersClass('hidden')}
                        >
                            {cross}
                        </div>
                    </div>
                    <BookingsFilters />
                </div>
            </div>
            <div className='mainTitle'>Мои бронирования</div>
            {filteredIds.length !== 0 ? (
                <div className={classes.bookingsListWrap}>
                    {filteredIds.map((item) => (
                        <RoomExBrief key={item} id={item} />
                    ))}
                </div>
            ) : (
                <div className='noContent'>Список пуст.</div>
            )}
        </>
    );
};

export default OrdinaryList;
