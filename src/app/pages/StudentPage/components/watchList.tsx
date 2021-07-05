import * as React from 'react';
import { useContext } from 'react';
import { WatchListCard } from './watchListCard';
import './watchListStyle.css';
import AppContext from '../context';

export function WatchList(props) {
  const { watchListStore } = useContext(AppContext) as any;
  console.log(watchListStore);
  const listItems = watchListStore.items.map(item => (
    <li>
      <WatchListCard course={item} />
    </li>
  ));
  return <ul className="listCourse">{listItems}</ul>;
}
