import React from 'react';
import PropTypes from 'prop-types';
import classes from './commonStyles.module.css';

const TopButton = ({ children, onClick, title, addedClass, parent }) => {
    return (
        <>
            {parent && (
                <button
                    className={classes.topBtn + ' ' + classes[addedClass]}
                    title={title}
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </>
    );
};
TopButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    title: PropTypes.string,
    addedClass: PropTypes.string,
    parent: PropTypes.string
};

export default TopButton;
