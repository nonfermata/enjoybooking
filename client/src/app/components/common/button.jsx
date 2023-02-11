import React from 'react';
import PropTypes from 'prop-types';
import classes from './commonStyles.module.css';

const Button = ({ children, color, disabled, onClick }) => {
    return (
        <button
            className={
                classes.button +
                ' ' +
                classes[color] +
                (disabled ? ' ' + classes.btnDisabled : '')
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    color: 'blue'
};

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;
