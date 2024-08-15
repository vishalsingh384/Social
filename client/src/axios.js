import axios from 'axios';

export const makeRequest=axios.create({
    baseURL:"https://unsocial.onrender.com/api",
    withCredentials:true
});
