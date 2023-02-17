import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../hooks/useAuth';
import edit from '../../../../common/svg/edit';
import bookings from '../../../../common/svg/bookings';
import heart from '../../../../common/svg/heart';
import logout from '../../../../common/svg/logout';
import classes from './profileMenu.module.css';

const ProfileMenu = () => {
    const { isAdmin } = useAuth();
    const menu = [
        {
            icon: bookings,
            path: 'my-bookings',
            name: 'Мои бронирования',
            adminDenied: true
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
    const menuHTML = menu.map(({ icon, path, name, adminDenied }) => {
        if (isAdmin && adminDenied) {
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
