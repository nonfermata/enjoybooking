import React from 'react';
import PropTypes from 'prop-types';
import loaderRing from '../../../assets/images/dual_ring_loader.gif';
import classes from './loader.module.css';

const Loader = ({ size }) => {
    return (
        <div className={classes.loader + ' ' + classes[size]}>
            <p>L O A D I N G . . . . .</p>
            <img src={loaderRing} alt='loading' />
        </div>
    );
};

Loader.defaultProps = {
    size: 'normal'
};

Loader.propTypes = {
    size: PropTypes.string
};

export default Loader;
