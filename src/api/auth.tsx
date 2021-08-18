import axios from 'axios';
import { API } from './url';
const APIUrl = API;
export const axiosAuthInstance = axios.create({
  baseURL: `${APIUrl}/auth`,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export async function AccessToken() {
  let token = '';
  const expires = new Date(localStorage.studyFiles_user_accessToken_expires);
  const dateNow = new Date(Date.now() + 5000);
  if (expires > dateNow) {
    token = localStorage.studyFiles_user_accessToken;
  } else {
    const axiosAuthInstance = axios.create({
      baseURL: `${APIUrl}/auth`,
      timeout: 5000,
    });
    const res = await axiosAuthInstance.post('/refresh-tokens', {
      refreshToken: localStorage.studyFiles_user_refreshToken,
    });
    localStorage.studyFiles_user_accessToken = res.data.access.token;
    localStorage.studyFiles_user_accessToken_expires = res.data.access.expires;
    localStorage.studyFiles_user_refreshToken = res.data.refresh.token;
    token = res.data.access.token;
  }
  return token;
}
