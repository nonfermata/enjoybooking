import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getRandomImage from '../../../utils/getRandomImage';
import renew from '../svg/renew';
import classes from './form.module.css';

const SelectAvatar = ({ onChange, name, value }) => {
    const [btnClass, setBtnClass] = useState('');
    const handleChangeAvatar = (event) => {
        event.preventDefault();
        const addedClass = btnClass === '' ? classes.btnRotated : '';
        setBtnClass(addedClass);
        setTimeout(() => {
            setBtnClass('');
        }, 1);
        onChange(name, getRandomImage());
    };
    return (
        <div className={classes.selectAvatarWrap}>
            <div className={classes.avatarDecr}>
                <p>Ваша аватарка:</p>
                <div
                    className={classes.avaBtnWrap + ' ' + btnClass}
                    onClick={handleChangeAvatar}
                    title='Изменить'
                >
                    {renew}
                </div>
            </div>
            <img className={classes.avatar} src={value} alt='Image' />
        </div>
    );
};

SelectAvatar.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
};

export default SelectAvatar;
