import httpService from './http.service';

const roomsEndpoint = 'rooms/';

const roomsService = {
    get: async () => {
        return await httpService.get(roomsEndpoint);
    }
};

export default roomsService;
