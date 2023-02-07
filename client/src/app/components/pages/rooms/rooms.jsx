import React, { useState } from 'react';
import Loader from '../../common/loader/loader';
import classes from './rooms.module.css';
import RoomBrief from '../../common/roomBrief/roomBrief';
import Pagination from '../../common/pagination/pagination';
import { paginate } from '../../../utils/paginate';
import { useRooms } from '../../../hooks/useRooms';

const Rooms = () => {
    const { rooms } = useRooms();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const pageSize = 4;
    if (rooms) {
        const count = rooms.length;
        const roomsCrops = paginate(rooms, currentPage, pageSize);
        return (
            <>
                <div className='mainTitle'>Наши номера</div>
                <div className={classes.roomsWrap}>
                    {roomsCrops.map((room) => (
                        <RoomBrief key={room._id} parent='rooms' {...room} />
                    ))}
                </div>
                <Pagination
                    count={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    pageChange={handlePageChange}
                />
            </>
        );
    }
    return <Loader />;
};

export default Rooms;
