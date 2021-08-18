import { AxiosInstance } from 'axios';

import axios from '../../config/axios';
import { AccessToken } from '../../../api/auth';

export const teacherRequest = async (
  callback: (axios: AxiosInstance) => Promise<any>,
) => {
  try {
    await AccessToken();

    axios.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
    };

    const response = await callback(axios);

    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};
