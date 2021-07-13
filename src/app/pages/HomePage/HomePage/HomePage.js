import React, { useContext } from 'react';
import Carousel, {
  slidesToShowPlugin,
  autoplayPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import TopBar from '../../../components/Topbar/Topbar';
import Footer from '../../../components/Footer/Footer';
import { CourseCard, CategoryCard } from '../../../components/Cards/Cards';
import CategoryTabs from '../components/CategoryTabs.js';
import AppContext from '../../../AppContext';

export default function HomePage() {
  const { store } = useContext(AppContext);
  if (store.query.trim() === '') {
    return (
      <>
        <TopBar initQuery={''} />
        {/* Best seller courses */}
        <div style={{ margin: '20px' }}>
          <h2 style={{ margin: '20px 20px 5px', color: '#525252' }}>
            Best sale courses
          </h2>
          <Carousel
            plugins={[
              'infinite',
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 4,
                },
              },
              {
                resolve: autoplayPlugin,
                options: {
                  interval: 2000,
                },
              },
            ]}
            animationSpeed={1000}
          >
            {store.bestSellerCourses.map(item => (
              <CourseCard course={item} />
            ))}
          </Carousel>
        </div>
        {/* Popular sub categories */}
        <div style={{ margin: '20px' }}>
          <h2 style={{ margin: '20px 20px 5px', color: '#525252' }}>
            Popular sub categories
          </h2>
          <Carousel
            plugins={[
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 5,
                },
              },
            ]}
          >
            {store.subCategories.map(item => (
              <CategoryCard category={item} />
            ))}
          </Carousel>
        </div>
        {store.categories.map(category => (
          <CategoryTabs category={category} />
        ))}
        <Footer />
      </>
    );
  } else return <></>;
}
