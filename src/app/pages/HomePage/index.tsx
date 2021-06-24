//import TopbarGuestPage from 'app/components/Topbar/TopbarGuestPage';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/Header/Header';
//import { CourseCard } from './components/courseCard';
import { CourseList } from './components/courseList';
import background from '../../../assets/background.jpg';
import { useEffect, useReducer } from 'react';
import reducer from './courseReducer';
import AppContext from './courseContext';

export function HomePage() {
  const initialAppState = {
    query: '',
    items: [],
  };

  const [store, dispatch] = useReducer(reducer, initialAppState);

  useEffect(function () {
    setTimeout(function () {
      const itemsFromBackend = [
        {
          name: 'Basic Web Coding',
          description:
            'In this course, I will teach you to make a simple website',
        },
        {
          name: 'Basic Web Coding1',
          description:
            'In this course, I will teach you to make a simple website',
        },
        {
          name: 'Basic Web Coding2',
          description:
            'In this course, I will teach you to make a simple website',
        },
        {
          name: 'Basic Web Coding3',
          description:
            'In this course, I will teach you to make a simple website',
        },
      ];

      dispatch({
        type: 'init',
        payload: {
          items: itemsFromBackend,
          query: '',
        },
      });
    }, 300);
  }, []);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Header />
      <div
        className="background"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '350px',
          marginLeft: '12%',
        }}
      ></div>
      <div style={{ margin: '10px' }}>
        <h3>New Courses</h3>
      </div>
      <div
        style={{
          marginLeft: '2rem',
          marginTop: '2rem',
        }}
      >
        <AppContext.Provider value={{ store, dispatch }}>
          <CourseList />
        </AppContext.Provider>
      </div>
    </>
  );
}
