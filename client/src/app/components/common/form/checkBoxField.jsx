import React from 'react';
import PropTypes from 'prop-types';
import classes from './form.module.css';

const CheckBoxField = ({ name, onChange, value, children }) => {
    const handleChange = ({ target }) => {
        onChange(name, target.checked);
    };
    return (
        <>
            <input
                className={classes.checkBoxInput}
                type='checkbox'
                checked={value}
                id={name}
                onChange={handleChange}
            />
            <label
                // className={}
                htmlFor={name}
            >
                {children}
            </label>
        </>
    );
};
CheckBoxField.propTypes = {
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default CheckBoxField;
