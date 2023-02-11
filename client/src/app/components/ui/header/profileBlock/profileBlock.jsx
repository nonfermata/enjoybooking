import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileMenu from './profileMenu/profileMenu';
import { useAuth } from '../../../../hooks/useAuth';
import classes from './profileBlock.module.css';

const ProfileBlock = () => {
    const onAppClick = useSelector((state) => state.onAppClick);
    const { currentUser } = useAuth();
    const [blockStyle, setBlockStyle] = useState({
        backgroundColor: 'var(--profile-bg-color)'
    });
    const [isMenu, setIsMenu] = useState(false);
    const handleMenuStatus = () => {
        setIsMenu((prevState) => !prevState);
        setBlockStyle(
            !isMenu ? { backgroundColor: 'var(--profile-bg-color)' } : {}
        );
    };
    useEffect(() => {
        setIsMenu(false);
        setBlockStyle({});
    }, [onAppClick]);
    return (
        <div className={classes.profileBlockWrap}>
            <div
                className={classes.profileBlock}
                style={blockStyle}
                onClick={handleMenuStatus}
            >
                <img
                    className={classes.icon}
                    src={currentUser.image}
                    alt='icon'
                />
                <div className={classes.name}>{currentUser.name}</div>
            </div>
            {isMenu && <ProfileMenu />}
        </div>
    );
};

export default ProfileBlock;
