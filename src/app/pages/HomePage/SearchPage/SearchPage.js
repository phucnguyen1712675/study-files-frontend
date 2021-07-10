import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

export default function SearchPage() {
  const { store } = useContext(AppContext);
  if (store.query.trim() !== '') return <h1>search page</h1>;
  else return <></>;
}
