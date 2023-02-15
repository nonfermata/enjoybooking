import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button';
import TopButton from '../topButton';
import { useAuth } from '../../../hooks/useAuth';
import heart from '../svg/heart';
import cross from '../svg/cross';
import classes from './roomBrief.module.css';
import updateFavourites from '../../../utils/updateFavourites';

const RoomBrief = ({
    _id,
    name,
    briefDescription,
    price,
    mainPhoto,
    parent
}) => {
    const history = useHistory();
    const { currentUser, updateUserData } = useAuth();
    const isFavourite =
        currentUser &&
        currentUser.favourites &&
        currentUser.favourites.some((item) => item === _id);
    const [topButtonStyle, setTopButtonStyle] = useState(
        currentUser && isFavourite && parent === 'rooms'
            ? {}
            : { display: 'none' }
    );
    const showTopButton = () => {
        setTopButtonStyle({});
    };
    const hideTopButton = () => {
        if (!isFavourite || parent === 'favourites') {
            setTopButtonStyle({ display: 'none' });
        }
    };
    const getTopButtonSVG = () => {
        if (parent === 'rooms') {
            return isFavourite ? heart.filled : heart.contoured;
        } else if (parent === 'favourites') {
            return cross;
        }
    };
    const getTopButtonTitle = () => {
        if (parent === 'favourites') {
            return 'Удалить из Избранного';
        } else if (parent === 'rooms') {
            return isFavourite
                ? 'Удалить из Избранного'
                : 'Добавить в Избранное';
        }
    };
    const handleFavouriteChange = async (event) => {
        event.stopPropagation();
        try {
            const newUserData = {
                ...currentUser,
                favourites: updateFavourites(currentUser.favourites, _id)
            };
            await updateUserData(newUserData);
        } catch (e) {
            console.log(e.message);
        }
    };
    const handleClick = () => {
        history.push(`/rooms/${_id}`);
    };

    return (
        <div
            className={classes.roomWrap}
            onMouseOver={showTopButton}
            onMouseLeave={hideTopButton}
            onClick={handleClick}
            title='Посмотреть номер'
        >
            {currentUser && parent !== 'setBooking' && (
                <TopButton
                    style={topButtonStyle}
                    title={getTopButtonTitle()}
                    onClick={handleFavouriteChange}
                >
                    {getTopButtonSVG()}
                </TopButton>
            )}
            <div className={classes.imgWrap}>
                <img className={classes.image} src={mainPhoto} alt='Photo' />
            </div>
            <h1 className={classes.title}>{name}</h1>
            <ul className={classes.briefDescriptionList}>
                {briefDescription.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <div className={classes.price}>${price}</div>
            <div className={classes.goToRoomBtn}>
                <Button color='blue'>Посмотреть</Button>
            </div>
        </div>
    );
};

RoomBrief.propTypes = {
    name: PropTypes.string,
    mainPhoto: PropTypes.string,
    briefDescription: PropTypes.array,
    price: PropTypes.number,
    _id: PropTypes.string,
    parent: PropTypes.string
};

export default RoomBrief;
