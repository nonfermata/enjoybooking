import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../hooks/useAuth';
import edit from '../../../../common/svg/edit';
import bookings from '../../../../common/svg/bookings';
import heart from '../../../../common/svg/heart';
import logout from '../../../../common/svg/logout';
import classes from './profileMenu.module.css';

const ProfileMenu = () => {
    const { currentUser } = useAuth();
    const adminStatus = currentUser._id === process.env.REACT_APP_ADMIN;
    const menu = [
        {
            icon: bookings,
            path: 'my-bookings',
            name: 'Мои бронирования',
            noadmin: true
        },
        {
            icon: heart.contoured,
            path: 'favourites',
            name: 'Избранное'
        },
        {
            icon: edit,
            path: 'edit-profile',
            name: 'Редактировать профиль'
        },
        {
            icon: logout,
            path: 'logout',
            name: 'Выход'
        }
    ];
    const menuHTML = menu.map(({ icon, path, name, noadmin }) => {
        if (adminStatus && noadmin) {
            return null;
        } else {
            return (
                <li key={path}>
                    <Link to={'/' + path}>
                        {icon}
                        {name}
                    </Link>
                </li>
            );
        }
    });
    return <ul className={classes.profileMenu}>{menuHTML}</ul>;
};

export default ProfileMenu;
