import axios from 'axios';

export const axiosAuthInstance = axios.create({
  baseURL: 'http://localhost:3030/v1/auth',
  timeout: 5000,
  // headers: {
  //   'X-Access-Token': 'accessToken'
  // }
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
