import React from "react";
import classes from "./form.module.css";
import PropTypes from "prop-types";
import getRandomImage from "../../../utils/getRandomImage";
import renew from "../svg/renew";

const SelectAvatar = ({ onChange, name, value }) => {
    const handleChangeAvatar = (event) => {
        event.preventDefault();
        onChange(name, getRandomImage());
    };
    return (
        <div className={classes.selectAvatarWrap}>
            <div className={classes.avatarDecr}>
                <p>Ваша аватарка:</p>
                <div
                    className={classes.avaBtnWrap}
                    onClick={handleChangeAvatar}
                    title="Изменить">
                    {renew}
                </div>
            </div>
            <img className={classes.avatar} src={value} alt="Image" />
        </div>
    );
};

SelectAvatar.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
};

export default SelectAvatar;
