import * as React from 'react';
import { useContext } from 'react';
import './watchListStyle.css';
import AppContext from '../context';
import { MyCourseCard } from './myCourseCard';

export function MyCourses(props) {
  const { myCoursesStore } = useContext(AppContext) as any;
  const listItems = myCoursesStore.items.map(item => (
    <li>
      <MyCourseCard course={item} />
    </li>
  ));
  return <ul className="listCourse">{listItems}</ul>;
}
