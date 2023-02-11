import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import Button from '../../common/button';
import CarouselBox from '../../common/carouselBox/carouselBox';
import TopButton from '../../common/topButton';
import DateChoice from '../../common/dateChoice/dateChoice';
import { useAuth } from '../../../hooks/useAuth';
import { useRooms } from '../../../hooks/useRooms';
import { useBookings } from '../../../hooks/useBookings';
import heart from '../../common/svg/heart';
import classes from './roomPage.module.css';

const RoomPage = () => {
    const { currentUser, updateUserFavourites } = useAuth();
    const { roomId } = useParams();
    const room = useRooms().getRoomById(roomId);
    const { getRoomBookings } = useBookings();
    const [activeCalendar, setActiveCalendar] = useState();
    const activateCalendar = (calendar) => {
        setActiveCalendar(calendar);
    };
    const [occupiedDates, setOccupiedDates] = useState([]);
    useEffect(() => {
        getRoomBookings(roomId).then((result) => {
            const filteredBookings = result.filter(
                (item) => item.status === 'ok'
            );
            setOccupiedDates(
                filteredBookings.map(({ checkIn, checkOut }) => ({
                    checkIn,
                    checkOut
                }))
            );
        });
    }, []);
    const isFavourite =
        currentUser &&
        currentUser.favourites &&
        currentUser.favourites.some((item) => item === roomId);
    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    };
    const getHTMLList = (prop) => {
        return room[prop].map((item) => <li key={item}>{item}</li>);
    };
    const getTopButtonSVG = () => {
        return isFavourite ? heart.filled : heart.contoured;
    };

    const handleFavouriteChange = async () => {
        try {
            await updateUserFavourites(roomId);
        } catch (e) {
            console.log(e.message);
        }
    };

    const isBookingButton =
        !currentUser ||
        (currentUser && currentUser._id !== process.env.REACT_APP_ADMIN);

    if (room) {
        return (
            <>
                <div className={classes.roomContentWrap}>
                    <div className={classes.leftPartWrap}>
                        <CarouselBox>
                            {room.photos.map((photo) => (
                                <div
                                    className={classes.imgWrap}
                                    key={photo.url}
                                >
                                    <img
                                        className={
                                            photo.orient === 'hor'
                                                ? classes.imageHor
                                                : classes.imageVert
                                        }
                                        src={photo.url}
                                    />
                                </div>
                            ))}
                        </CarouselBox>
                    </div>
                    <div className={classes.roomDescription}>
                        {currentUser && (
                            <TopButton
                                title={
                                    isFavourite
                                        ? 'Удалить из Избранного'
                                        : 'Добавить в Избранное'
                                }
                                onClick={() => handleFavouriteChange(room._id)}
                                style={{
                                    top: '45px',
                                    right: '10px',
                                    color: 'var(--orange-color)',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                {getTopButtonSVG()}
                            </TopButton>
                        )}
                        <div className={classes.roomHeader}>
                            <p>{room.name}</p>
                            <p className={classes.price}>
                                {'$' + room.price + ' / ночь'}
                            </p>
                        </div>
                        <ul className={classes.briefDescriptionList}>
                            {getHTMLList('briefDescription')}
                        </ul>
                        <p className={classes.amenitiesTitle}>
                            Удобства в номере
                        </p>
                        <ul className={classes.amenitiesList}>
                            {getHTMLList('amenitiesInside')}
                        </ul>
                        <p className={classes.amenitiesTitle}>
                            Удобства общего пользования:
                        </p>
                        <ul className={classes.amenitiesList}>
                            {getHTMLList('amenitiesOutside')}
                        </ul>
                    </div>
                </div>
                <div className={classes.footerWrap}>
                    <div className={classes.calendarWrap}>
                        <DateChoice
                            occupiedDates={occupiedDates}
                            choiceName='checkIn'
                            activeCalendar={activeCalendar}
                            activateCalendar={activateCalendar}
                        />
                    </div>
                    <div className={classes.buttonsWrap}>
                        <Button color='blue' onClick={handleBack}>
                            <div className={classes.buttonSize}>Назад</div>
                        </Button>
                        {isBookingButton && (
                            <Link to={'/set-booking/' + roomId}>
                                <Button color='green'>
                                    <div className={classes.buttonSize}>
                                        Забронировать
                                    </div>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </>
        );
    }
    return <Loader />;
};

export default RoomPage;
