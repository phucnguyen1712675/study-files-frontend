import React, { useContext } from 'react';
import SubCategoryTabs from './SubCategoryTabs';
import AppContext from '../../../AppContext';
import { LensTwoTone } from '@material-ui/icons';

export default function CategoryTabs({ category }) {
  const { store } = useContext(AppContext);
  const categoriesWidget = function () {
    let isHaveCourse = false;
    let subCategories = Array.from(
      store.subCategories.filter(
        subCategory => subCategory.categoryId === category.id,
      ),
    );
    if (subCategories.length > 0) {
      for (var subCategory of subCategories) {
        const courses = Array.from(
          store.latestCourses.filter(
            course => course.subCategoryId === subCategory.id,
          ),
        );
        if (courses.length > 0) {
          isHaveCourse = true;
          break;
        }
      }
    }

    if (isHaveCourse) {
      return (
        <div style={{ margin: '20px' }}>
          <h1 style={{ margin: '20px 20px 5px', color: '#387CFF' }}>
            {category.name}
          </h1>
          {store.subCategories
            .filter(subCategory => subCategory.categoryId === category.id)
            .map(subCategory => (
              <SubCategoryTabs
                subCategory={subCategory}
                isNavigate={true}
                key={subCategory.id}
              />
            ))}
        </div>
      );
    } else {
      return <></>;
    }
  };
  return <>{categoriesWidget()}</>;
}
