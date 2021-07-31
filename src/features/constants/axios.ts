import axios from 'axios';

const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGJiMzk1YzRkY2UxYTA1MTg4ZWEzZTAiLCJpYXQiOjE2Mjc3MjA5NDMsImV4cCI6MTYyNzcyMjc0MywidHlwZSI6ImFjY2VzcyJ9.NI54vYYZs6Bkmky7d9hmvUGGlCLPz1IqSxdfg7pI1DY';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common = { Authorization: `Bearer ${AUTH_TOKEN}` };
export default axios;
