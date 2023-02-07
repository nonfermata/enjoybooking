import React from 'react';
import _ from 'lodash';
import classes from './pagination.module.css';
import PropTypes from 'prop-types';

const Pagination = ({ count, pageSize, pageChange, currentPage }) => {
    const pagesCount = Math.ceil(count / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <ul className={classes.pagination}>
            {pages.map((number) => (
                <li
                    key={'page_' + number}
                    className={currentPage === number ? classes.active : ''}
                    onClick={() => pageChange(number)}>
                    {number}
                </li>
            ))}
        </ul>
    );
};
Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
