import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckBoxField from '../form/checkBoxField';
import Button from '../button';
import {
    getBookingsFilters,
    applyBookingsFilters,
    initialState
} from '../../../../redux/bookingsFiltersReducer';
import classes from './filters.module.css';

const BookingsFilters = () => {
    const dispatch = useDispatch();
    const storeData = useSelector(getBookingsFilters());
    const [filters, setFilters] = useState(storeData);
    const handleCheckboxChange = (name, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleReset = () => {
        setFilters(initialState);
    };
    useEffect(() => {
        dispatch(applyBookingsFilters(filters));
    }, [filters]);

    return (
        <>
            <ul className={classes.options}>
                <li className={classes.item}>
                    <CheckBoxField
                        name='current'
                        value={filters.current}
                        onChange={handleCheckboxChange}
                    >
                        Действующие
                    </CheckBoxField>
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='completed'
                        value={filters.completed}
                        onChange={handleCheckboxChange}
                    >
                        Завершенные
                    </CheckBoxField>
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='canceled'
                        value={filters.canceled}
                        onChange={handleCheckboxChange}
                    >
                        Отмененные
                    </CheckBoxField>
                </li>
            </ul>
            <div className={classes.btnWrap}>
                <Button color='blue' onClick={handleReset}>
                    Показать все
                </Button>
            </div>
        </>
    );
};

export default BookingsFilters;
