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
    const activeText = 'var(--base-color)';
    const inactiveText = 'var(--light-grey-color)';
    const handleCheckboxChange = (name, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: { ...storeData[name], isActive: value }
        }));
    };
    const handleInputChange = (name, value) => {
        const parentName = name.split('_')[1];
        setFilters((prevState) => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
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
                        onChange={handleCheckboxChange}
                    >
                        Цена за ночь ($)
                    </CheckBoxField>
                    <div className={classes.textFieldsWrap}>
                        от
                        <TextField
                            name='start_price'
                            value={String(filters.price.start_price)}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                        onChange={handleCheckboxChange}
                    >
                        Количество человек, от
                    </CheckBoxField>
                    <TextField
                        name='value_capacity'
                        value={String(filters.capacity.value_capacity)}
                        onChange={handleInputChange}
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
                        onChange={handleCheckboxChange}
                    >
                        Санузел в номере
                    </CheckBoxField>
                </li>
                <li className={classes.item}>
                    <CheckBoxField
                        name='kitchen'
                        value={filters.kitchen.isActive}
                        onChange={handleCheckboxChange}
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
