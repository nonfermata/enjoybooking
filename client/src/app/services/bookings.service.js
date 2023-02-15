import httpService from './http.service';

const bookingsEndpoint = '/bookings/';

const bookingsService = {
    get: async () => {
        return await httpService.get(bookingsEndpoint);
    },
    create: async (payload) => {
        return await httpService.post(
            bookingsEndpoint + 'createBooking',
            payload
        );
    },
    update: async (payload) => {
        return await httpService.patch(
            bookingsEndpoint + 'update/' + payload._id,
            payload
        );
    },
    delete: async (id) => {
        return await httpService.delete(bookingsEndpoint + id);
    }
};

export default bookingsService;
