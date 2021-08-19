import React, { useContext } from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import { Spin, Carousel as AntdCarousel } from 'antd';
import { Grid } from '@material-ui/core';

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
      id: 1,
      title: `Welcome to STUDY-FILES!`,
      content:
        'Participants from all over the world are embarking on new careers, advancing in their fields and enriching their lives.',
      background: `${welcome1}`,
    },
    {
      id: 2,
      title: 'A wide selection of courses',
      content:
        'Choose from hundreds of online course with videos from diversification of fields. New courses are added every month !!',
      background: `${welcome2}`,
    },
    {
      id: 3,
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
            key={item.id}
            title={item.title}
            content={item.content}
            background={item.background}
          />
        ))}
      </AntdCarousel>

      {/* Best seller courses */}
      <div style={{ margin: '40px 0px 20px' }}>
        <h2
          style={{
            margin: '20px 20px 5px',
            color: '#525252',
            fontWeight: 'bolder',
            fontSize: 25,
          }}
        >
          TOP 4 Best sale courses this week
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
          <Grid container style={{ width: '100%' }} justifyContent="center">
            {store.bestSellerCourses.map(item => (
              <Grid item key={item.id}>
                <CourseCard course={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      {/* Popular sub categories */}
      <div style={{ margin: '20px' }}>
        <h2
          style={{
            margin: '20px 20px 5px',
            color: '#525252',
            fontWeight: 'bolder',
            fontSize: 25,
          }}
        >
          BEST SALE sub categories this week
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
              Loading best sale sub categories ...
            </div>
          </div>
        ) : (
          <Grid container style={{ width: '100%' }} justifyContent="center">
            {store.bestSellerSubCategories.map(item => (
              <Grid item key={item._id}>
                <CategoryCard category={item} />
              </Grid>
            ))}
          </Grid>
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
