import React, { useEffect, useReducer } from 'react';
import Topbar from 'app/components/Topbar/Topbar';
import HomePage from './HomePage/HomePage';
import SearchPage from './SearchPage/SearchPage';

import reducer from './components/homePageReducer';
import AppContext from '../../AppContext';
import { axiosGuestInstance } from '../../../api/guest';

export function IndexHomePage() {
  const initialAppState = {
    query: '',
    selectedSubCategory: '',
    bestSellerCourses: [],
    categories: [],
    subCategories: [],
    latestCourses: [],
  };

  const [store, dispatch] = useReducer(reducer, initialAppState);

  useEffect(function () {
    async function loadApp() {
      const bestSellerCoursesRes = await axiosGuestInstance.get(
        `/courses?sortBy=subscriberNumber:desc&limit=4`,
      );
      const categoriesRes = await axiosGuestInstance.get(`/categories`);
      const subCategoriesRes = await axiosGuestInstance.get(`/subCategories`);
      var latestCourses: any[] = [];
      await subCategoriesRes.data.map(async subCate => {
        const coursesRes = await axiosGuestInstance.get(
          `/courses?sortBy=createdAt:desc&limit=10&subCategoryId=${subCate.id}`,
        );
        latestCourses = [...latestCourses, ...coursesRes.data.results];
      });
      console.log(latestCourses);
      console.log(1 + ' : ' + latestCourses.length);
      dispatch({
        type: 'init',
        payload: {
          query: '',
          selectedSubCategory: '',
          bestSellerCourses: bestSellerCoursesRes.data.results,
          categories: categoriesRes.data,
          subCategories: subCategoriesRes.data,
          latestCourses: latestCourses,
        },
      });
      console.log(2 + ' : ' + latestCourses.length);
    }
    loadApp();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ store, dispatch }}>
        <Topbar initQuery={''} />
        <HomePage />
        <div>hello</div>
        <SearchPage />
      </AppContext.Provider>
    </>
  );
}
