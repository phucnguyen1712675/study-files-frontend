import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
};
export default axios;
