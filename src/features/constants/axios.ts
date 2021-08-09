import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;

axios.defaults.timeout = 5000000;

export default axios;
