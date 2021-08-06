import { AxiosStatic } from 'axios';

import { teacherRequest } from './utils';

export const addCourse = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/courses', payload);
    return response;
  };
  return teacherRequest(request);
};

export const addSection = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/sections', payload);
    return response;
  };
  return teacherRequest(request);
};

export const addLecture = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.post('/teachers/lectures', payload);
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

export const updateCourse = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const { courseId, ...body } = payload;

    const response = await axios.patch(`/teachers/courses/${courseId}`, body);

    return response;
  };
  return teacherRequest(request);
};

export const updateSection = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const { sectionId, ...body } = payload;

    const response = await axios.patch(`/teachers/sections/${sectionId}`, body);

    return response;
  };
  return teacherRequest(request);
};

export const swapSectionOrdinalNumber = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(
      '/teachers/sections/swap-ordinal-number',
      payload,
    );
    return response;
  };
  return teacherRequest(request);
};

export const updateLecture = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const { lectureId, ...body } = payload;

    const response = await axios.patch(`/teachers/lectures/${lectureId}`, body);

    return response;
  };
  return teacherRequest(request);
};

export const swapLectureOrdinalNumber = async (payload: any) => {
  const request = async (axios: AxiosStatic) => {
    const response = await axios.patch(
      '/teachers/lectures/swap-ordinal-number',
      payload,
    );
    return response;
  };
  return teacherRequest(request);
};
