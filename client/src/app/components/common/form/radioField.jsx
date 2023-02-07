import React from 'react';
import PropTypes from 'prop-types';
import classes from './form.module.css';

const RadioField = ({ label, options, name, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange(name, target.value);
    };
    return (
        <div className={classes.radioWrap}>
            <label className={classes.label1}>{label}</label>
            <div className={classes.radioInputWrap}>
                {options.map((option) => (
                    <div key={option.name + '_' + option.value}>
                        <input
                            className={classes.radioInput}
                            type='radio'
                            name={name}
                            checked={option.value === value}
                            id={option.name + '_' + option.value}
                            value={option.value}
                            onChange={handleChange}
                        />
                        <label
                            className={classes.radioLabel}
                            htmlFor={option.name + '_' + option.value}>
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default RadioField;
