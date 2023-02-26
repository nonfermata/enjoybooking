import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RoomBrief from '../../common/roomBrief/roomBrief';
import Loader from '../../common/loader/loader';
import Pagination from '../../common/pagination/pagination';
import RoomsFilters from '../../common/filters/roomsFilters';
import { paginate } from '../../../utils/paginate';
import { useRooms } from '../../../hooks/useRooms';
import { getRoomsFilters } from '../../../../redux/roomsFiltersReducer';
import getFilteredRooms from '../../../utils/getFilteredRooms';
import cross from '../../common/svg/cross';
import classes from './rooms.module.css';

const Rooms = () => {
    const { rooms } = useRooms();
    const filters = useSelector(getRoomsFilters());
    const filteredRooms = getFilteredRooms(rooms, filters);
    const isFiltersActive = rooms.length !== filteredRooms.length;
    const filtersTitleStyle = isFiltersActive
        ? { fontWeight: '500', color: 'var(--orange-color' }
        : {};
    const [currentPage, setCurrentPage] = useState(1);
    const [filtersClass, setFiltersClass] = useState('hidden');
    const handlePageChange = (page) => {
        window.scrollBy(0, -10000);
        setCurrentPage(page);
    };
    const pageSize = 4;
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);
    if (filteredRooms) {
        const count = filteredRooms.length;
        const roomsCrops = paginate(filteredRooms, currentPage, pageSize);
        const paginationBlock = (
            <Pagination
                count={count}
                pageSize={pageSize}
                currentPage={currentPage}
                pageChange={handlePageChange}
            />
        );
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
                        <RoomsFilters />
                    </div>
                </div>
                <div className='mainTitle'>Наши номера</div>
                <div className={classes.mobilePagination}>
                    {paginationBlock}
                </div>
                {count > 0 ? (
                    <div className={classes.roomsWrap}>
                        {roomsCrops.map((room) => (
                            <RoomBrief
                                key={room._id}
                                parent='rooms'
                                {...room}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='noContent'>
                        С такими параметрами{' '}
                        <span className='no_wrap'>номеров нет.</span>
                    </div>
                )}
                {paginationBlock}
            </>
        );
    }
    return <Loader />;
};

export default Rooms;
