import axios from 'axios';
import { API } from './url';

const APIUrl = API;
export const axiosAdminInstance = axios.create({
  baseURL: `${APIUrl}/admin`,
  timeout: 5000000,
  headers: {
    Authorization: 'Bearer Token' + localStorage.studyFiles_user_accessToken,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
export const axiosInstance = axios.create({
  baseURL: `${APIUrl}`,
  timeout: 5000000,
  headers: {
    Authorization: 'Bearer Token' + localStorage.studyFiles_user_accessToken,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
