import axios from 'axios';
import sweetAlert from './alert';

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    sweetAlert({ icon: 'error', title: "An error occured! Please try again." });
    console.log(error); //delete at production
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    sweetAlert({ icon: 'error', title: error.response.data.message });
    console.log(error);
    return Promise.reject(error);
});


export default axios;