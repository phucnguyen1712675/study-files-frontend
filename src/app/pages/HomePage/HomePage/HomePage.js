import React, { useContext } from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Spin, Carousel as AntdCarousel } from 'antd';

import TopBar from '../../../components/Topbar/Topbar';
import Footer from '../../../components/Footer/Footer';
import { CourseCard, CategoryCard } from '../../../components/Cards/Cards';
import CategoryTabs from '../components/CategoryTabs.js';
import CarouselCard from '../components/CarouselCard';
import AppContext from '../../../AppContext';
import welcome1 from 'images/welcome1.jpg';
import welcome2 from 'images/welcome2.jpg';
import welcome3 from 'images/welcome3.jpg';

export default function HomePage() {
  const { store } = useContext(AppContext);
  const WelcomeCarousel = [
    {
      title: `Welcome to STUDY-FILES!`,
      content:
        'Participants from all over the world are embarking on new careers, advancing in their fields and enriching their lives.',
      background: `${welcome1}`,
    },
    {
      title: 'A wide selection of courses',
      content:
        'Choose from hundreds of online course with videos from diversification of fields. New courses are added every month !!',
      background: `${welcome2}`,
    },
    {
      title: `Let's study now `,
      content:
        'Many free courses to try, eazy to use and so on ! What are you waiting for ? sign up now!!',
      background: `${welcome3}`,
    },
  ];

  return (
    <>
      <TopBar initQuery={''} />
      <AntdCarousel autoplay>
        {WelcomeCarousel.map(item => (
          <CarouselCard
            title={item.title}
            content={item.content}
            background={item.background}
          />
        ))}
      </AntdCarousel>

      {/* Best seller courses */}
      <div style={{ margin: '40px 20px 20px' }}>
        <h2
          style={{
            margin: '20px 50px 5px',
            color: '#525252',
            fontWeight: 'bolder',
            fontSize: 25,
          }}
        >
          Best sale courses
        </h2>
        {store.loading ? (
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Spin />
            <div style={{ color: '#525252', fontWeight: 'lighter' }}>
              Loading best sale courses ...
            </div>
          </div>
        ) : (
          <Carousel
            plugins={[
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 4,
                },
              },
            ]}
            animationSpeed={1000}
          >
            {store.bestSellerCourses.map(item => (
              <CourseCard course={item} key={item.id} />
            ))}
          </Carousel>
        )}
      </div>
      {/* Popular sub categories */}
      <div style={{ margin: '20px' }}>
        <h2
          style={{
            margin: '20px 50px 5px',
            color: '#525252',
            fontWeight: 'bolder',
            fontSize: 25,
          }}
        >
          Popular sub categories
        </h2>
        {store.loading ? (
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Spin />
            <div style={{ color: '#525252', fontWeight: 'lighter' }}>
              Loading popular courses ...
            </div>
          </div>
        ) : (
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
              <CategoryCard category={item} key={item.id} />
            ))}
          </Carousel>
        )}
      </div>
      {store.loading ? (
        <div
          style={{
            marginTop: '30px',
            width: '100%',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Spin />
          <div style={{ color: '#525252', fontWeight: 'lighter' }}>
            Loading categories list ...
          </div>
        </div>
      ) : (
        store.categories.map(category => (
          <CategoryTabs category={category} key={category.id} />
        ))
      )}
      <Footer />
    </>
  );
}
