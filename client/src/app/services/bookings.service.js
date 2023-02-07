import httpService from './http.service';

const bookingsEndpoint = 'bookings/';

const bookingsService = {
    get: async () => {
        return await httpService.get(bookingsEndpoint);
    },
    getBookingById: async (id) => {
        return await httpService.get(bookingsEndpoint + id);
    },
    create: async (payload) => {
        return await httpService.put(bookingsEndpoint + payload._id, payload);
    },
    update: async (payload) => {
        return await httpService.patch(bookingsEndpoint + payload._id, payload);
    },
    delete: async (id) => {
        return await httpService.delete(bookingsEndpoint + id);
    }
};

export default bookingsService;
