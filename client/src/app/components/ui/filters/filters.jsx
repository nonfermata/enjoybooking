/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckBoxField from '../../common/form/checkBoxField';
import TextField from '../../common/form/textField';
import Button from '../../common/button';
import {
    applyFilters,
    getFilters,
    initialState
} from '../../../../redux/filtersReducer';
import changeNumber from '../../../utils/changeNumber';
import classes from './filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();
    const storeData = useSelector(getFilters());
    const [filters, setFilters] = useState(storeData);
    const textFieldStyle = { padding: '7px', width: '50px' };
    const inactiveText = 'var(--light-grey-color)';
    const activeText = 'var(--base-color)';
    const handleActivate = (name, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: { ...storeData[name], isActive: value }
        }));
    };
    const handleValueChange = (name, value) => {
        const parentObjectName = name.split('_')[1];
        setFilters((prevState) => ({
            ...prevState,
            [parentObjectName]: {
                ...prevState[parentObjectName],
                [name]: changeNumber(value)
            }
        }));
    };
    const handleReset = () => {
        setFilters(initialState);
    };
    useEffect(() => {
        dispatch(applyFilters(filters));
    }, [filters]);

    return (
        <>
            <ul className={classes.options}>
                <li className={classes.item}>
                    <CheckBoxField
                        name='price'
                        value={filters.price.isActive}
                        onChange={handleActivate}
                    >
                        Цена за ночь ($)
                    </CheckBoxField>
                    <div className={classes.textFieldsWrap}>
                        от
                        <TextField
                            name='start_price'
                            value={String(filters.price.start_price)}
                            onChange={handleValueChange}
                            inputStyle={
                                filters.price.isActive
                                    ? { ...textFieldStyle, color: activeText }
                                    : { ...textFieldStyle, color: inactiveText }
                            }
                            isDisabled={!filters.price.isActive}
                        />
                        до
                        <TextField
                            name='end_price'
                            value={String(filters.price.end_price)}
                            onChange={handleValueChange}
                            inputStyle={
                                filters.price.isActive
                                    ? { ...textFieldStyle, color: activeText }
                                    : { ...textFieldStyle, color: inactiveText }
                            }
                            isDisabled={!filters.price.isActive}
                        />
                    </div>
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='capacity'
                        value={filters.capacity.isActive}
                        onChange={handleActivate}
                    >
                        Количество человек, от
                    </CheckBoxField>
                    <TextField
                        name='value_capacity'
                        value={String(filters.capacity.value_capacity)}
                        onChange={handleValueChange}
                        inputStyle={
                            filters.capacity.isActive
                                ? { ...textFieldStyle, color: activeText }
                                : { ...textFieldStyle, color: inactiveText }
                        }
                        isDisabled={!filters.capacity.isActive}
                    />
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='bathroom'
                        value={filters.bathroom.isActive}
                        onChange={handleActivate}
                    >
                        Санузел в номере
                    </CheckBoxField>
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='kitchen'
                        value={filters.kitchen.isActive}
                        onChange={handleActivate}
                    >
                        Собственная кухня
                    </CheckBoxField>
                </li>
            </ul>
            <div className={classes.btnWrap}>
                <Button color='grey' onClick={handleReset}>
                    Сбросить фильтры
                </Button>
            </div>
        </>
    );
};

export default Filters;
