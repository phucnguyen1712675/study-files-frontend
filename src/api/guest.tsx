import axios from 'axios';
import { API } from './url';
const APIUrl = API;
export const axiosGuestInstance = axios.create({
  baseURL: `${APIUrl}`,
  timeout: 5000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
