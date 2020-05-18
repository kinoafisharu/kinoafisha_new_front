import axios from 'axios'

const service = axios.create({
    baseURL: 'https://new-new-api.herokuapp.com/?format=json', // url = base url + request url
    timeout: 5000,
    // withCredentials: true // send cookies when cross-domain requests
})

service.interceptors.request.use(
    (config) => {
        config.params['format'] = 'json'
        return config
    }
)

export default service
