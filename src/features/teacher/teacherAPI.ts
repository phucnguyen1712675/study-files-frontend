import { AxiosStatic } from 'axios';

import { teacherRequest } from './utils';

export const updateTeacherInfo = async (teacherId: string, data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(`/auth/update/${teacherId}`, data);
    return response;
  };
  return teacherRequest(request);
};

export const updatePassword = async (teacherId: string, data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(
      `/auth/update-password/${teacherId}`,
      data,
    );
    return response;
  };
  return teacherRequest(request);
};

export const addCourse = async (data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/courses', data);
    return response;
  };
  return teacherRequest(request);
};

export const addSection = async (data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/sections', data);
    return response;
  };
  return teacherRequest(request);
};

export const addLecture = async (data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/lectures', data);
    return response;
  };
  return teacherRequest(request);
};

export const getLecturesTotalResults = async (sectionId: string) => {
  const request = async (axios: AxiosStatic) => {
    const { data } = await axios.get(
      `/teachers/lectures?sectionId=${sectionId}`,
    );
    const { totalResults } = data;
    return totalResults;
  };
  return teacherRequest(request);
};

export const getSectionsDetailsResults = async (courseId: string) => {
  const request = async (axios: AxiosStatic) => {
    const { data } = await axios.get(
      `/teachers/sections/details?courseId=${courseId}&sortBy=ordinalNumber:asc`,
    );
    const { results } = data;
    return results;
  };
  return teacherRequest(request);
};

export const updateCourse = async (courseId: string, data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(`/teachers/courses/${courseId}`, data);

    return response;
  };
  return teacherRequest(request);
};

export const updateSection = async (sectionId: string, data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(`/teachers/sections/${sectionId}`, data);
    return response;
  };
  return teacherRequest(request);
};

export const swapSectionOrdinalNumber = async (data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(
      '/teachers/sections/swap-ordinal-number',
      data,
    );
    return response;
  };
  return teacherRequest(request);
};

export const updateLecture = async (lectureId: string, data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(`/teachers/lectures/${lectureId}`, data);
    return response;
  };
  return teacherRequest(request);
};

export const swapLectureOrdinalNumber = async (data: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(
      '/teachers/lectures/swap-ordinal-number',
      data,
    );
    return response;
  };
  return teacherRequest(request);
};
