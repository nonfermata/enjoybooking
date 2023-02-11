import React from 'react';
import PropTypes from 'prop-types';
import classes from './commonStyles.module.css';

const TopButton = ({ children, onClick, title, style }) => {
    return (
        <button
            style={style}
            className={classes.topBtn}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
TopButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.object
};

export default TopButton;
