/* eslint-disable indent */
import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    function (request) {
        if (configFile.isFireBase) {
            request.url =
                (/\/$/.test(request.url)
                    ? request.url.slice(0, -1)
                    : request.url) + '.json';
        }
        return request;
    },
    function (error) {
        Promise.reject(error);
    }
);

const transformData = (data) => {
    return data && !data._id ? Object.values(data) : data;
};

http.interceptors.response.use(
    function (response) {
        if (configFile.isFireBase) {
            return transformData(response.data);
        }
        return response;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error('Что-то пошло не так... Попробуйте позднее.');
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
