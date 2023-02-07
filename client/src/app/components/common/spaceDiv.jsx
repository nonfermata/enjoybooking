import React from 'react';
import PropTypes from 'prop-types';

const SpaceDiv = ({ height }) => {
    return <div style={{ height: height + 'px' }}></div>;
};

SpaceDiv.propTypes = {
    height: PropTypes.string.isRequired
};

export default SpaceDiv;
