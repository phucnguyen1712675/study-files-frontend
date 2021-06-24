import * as React from 'react';
import { useContext } from 'react';
import { CourseCard } from './courseCard';
import './listCourseStyle.css';
import AppContext from '../courseContext';

export function CourseList(props) {
  const { store } = useContext(AppContext) as any;
  const listItems = store.items.map(item => (
    <li>
      <CourseCard course={item} />
    </li>
  ));
  return <ul className="listCourse">{listItems}</ul>;
}
