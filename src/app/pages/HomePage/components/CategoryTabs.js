import React, { useContext } from 'react';
import SubCategoryTabs from './SubCategoryTabs';
import AppContext from '../../../AppContext';
import background from 'images/background3.jpg';

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
            // eslint-disable-next-line no-loop-func
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
          <div
            style={{
              borderRadius: '3px',
              height: '100px',
              margin: '60px 50px 40px',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${background})`,
              backgroundPosition: 'center' /* Center the image */,
              backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
              backgroundSize: 'cover',
            }}
          >
            <h1
              style={{
                margin: '20px 20px',
                color: '#fafafa',
                fontWeight: 'bolder',
                fontSize: 35,
              }}
            >
              {category.name}
            </h1>
          </div>
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
