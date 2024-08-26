// apis/axios_helper.js
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Adjust this to your backend URL

export const request = (method, url, data = null) => {
    return axios({
        method,
        url: `${API_URL}${url}`,
        data,
    });
};
