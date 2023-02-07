import httpService from './http.service';
import localStorageService from './localStorage.service';

const usersEndpoint = 'users/';

const usersService = {
    get: async () => {
        return await httpService.get(usersEndpoint);
    },
    getUserById: async (id) => {
        return await httpService.get(usersEndpoint + id);
    },
    getCurrentUser: async () => {
        return await httpService.get(
            usersEndpoint + localStorageService.getUserId()
        );
    },
    create: async (payload) => {
        return await httpService.put(usersEndpoint + payload._id, payload);
    },
    update: async (payload) => {
        return await httpService.patch(
            usersEndpoint + localStorageService.getUserId(),
            payload
        );
    }
};

export default usersService;
