import axios from 'axios';

export const request = (method, url, data) => {
    return axios({
        method,
        url: `http://localhost:8080${url}`,
        data,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
