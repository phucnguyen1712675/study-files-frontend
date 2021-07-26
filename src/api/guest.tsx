import axios from 'axios';
import { API } from './url';
const APIUrl = API;
export const axiosGuestInstance = axios.create({
  baseURL: `${APIUrl}`,
  timeout: 5000000,
});
