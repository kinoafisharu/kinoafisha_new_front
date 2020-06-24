// Главный обьект AXIOS, формирует запросы к API, импортируется как service
import axios from 'axios'

const service = axios.create({
    baseURL: 'https://new-new-api.herokuapp.com/', // url = base url + request url
    timeout: 30000,
    // withCredentials: true // send cookies when cross-domain requests
})


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  });

export default service
