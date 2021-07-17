import React, { useContext } from 'react';
import SubCategoryTabs from './SubCategoryTabs';
import AppContext from '../../../AppContext';

export default function CategoryTabs({ category }) {
  const { store } = useContext(AppContext);
  return (
    <>
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
    </>
  );
}
