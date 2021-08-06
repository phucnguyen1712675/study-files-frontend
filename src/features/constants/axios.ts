import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;

export default axios;
