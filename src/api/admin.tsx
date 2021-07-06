import axios from 'axios';

export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:3030/v1/admin',
  timeout: 5000000,
  headers: {
    Authorization: 'Bearer Token' + localStorage.studyFiles_user_accessToken,
  },
  // headers: {
  //   'X-Access-Token': 'accessToken'
  // }
});
