import React, { useState, useEffect } from 'react';
import Loader from '../../common/loader/loader';
import RoomBrief from '../../common/roomBrief/roomBrief';
import Pagination from '../../common/pagination/pagination';
import { useAuth } from '../../../hooks/useAuth';
import { useRooms } from '../../../hooks/useRooms';
import { paginate } from '../../../utils/paginate';
import classes from './favourites.module.css';

const Favourites = () => {
    const { rooms: allRooms } = useRooms();
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const favouriteRooms = () => {
        if (currentUser.favourites) {
            return currentUser.favourites.map((id) =>
                allRooms.find((room) => room._id === id)
            );
        } else return [];
    };
    const [rooms, setRooms] = useState(favouriteRooms());
    const pageSize = 4;

    useEffect(() => {
        if (
            currentPage > 1 &&
            rooms.length - 1 === (currentPage - 1) * pageSize
        ) {
            setCurrentPage(currentPage - 1);
        }
        setRooms(favouriteRooms());
    }, [currentUser]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    if (rooms) {
        const count = rooms.length;
        const roomsCrops = paginate(rooms, currentPage, pageSize);
        return (
            <>
                <div className='mainTitle'>Избранное</div>
                <div className={classes.roomsWrap}>
                    {rooms.length !== 0 ? (
                        roomsCrops.map((room) => (
                            <RoomBrief
                                key={room._id}
                                parent='favourites'
                                {...room}
                            />
                        ))
                    ) : (
                        <div className='noContent'>
                            У Вас ничего нет в &quot;Избранном&quot;.
                        </div>
                    )}
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

export default Favourites;
