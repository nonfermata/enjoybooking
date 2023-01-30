import React from "react";
import classes from "./commonStyles.module.css";
import PropTypes from "prop-types";

const TopButton = ({ children, handleClick, title, style }) => {
    return (
        <button
            style={style}
            className={classes.topBtn}
            title={title}
            onClick={handleClick}>
            {children}
        </button>
    );
};
TopButton.propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.object
};

export default TopButton;
