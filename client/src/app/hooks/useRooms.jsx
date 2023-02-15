import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../components/common/loader/loader';
import roomsService from '../services/rooms.service';

const RoomsContext = React.createContext();

export const useRooms = () => useContext(RoomsContext);

const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRooms();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getRooms() {
        try {
            const data = await roomsService.get();
            setRooms(_.orderBy(data, ['listNumber']));
            setIsLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function getRoomById(id) {
        return rooms.find((room) => room._id === id);
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <RoomsContext.Provider value={{ rooms, getRoomById }}>
            {!isLoading ? children : <Loader />}
        </RoomsContext.Provider>
    );
};
RoomsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default RoomsProvider;
