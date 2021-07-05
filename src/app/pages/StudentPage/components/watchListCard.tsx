import { axiosInstance } from 'api';
import * as React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Card, Button } from 'react-bootstrap';
import reducer from '../reducer';

export function WatchListCard({ course }) {
  const initialAppState = {
    query: '',
    items: [],
  };

  const [store, dispatch] = useReducer(reducer, initialAppState);

  useEffect(
    function () {
      async function loadCourse() {
        const res = await axiosInstance.get(`/course/${course.courseId}`);
        dispatch({
          type: 'init',
          payload: {
            items: res.data,
            query: '',
          },
        });
      }

      loadCourse();
    },
    [course.courseId],
  );

  return (
    <>
      <Card style={{ width: '18rem', border: '1px solid #000000' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body style={{ padding: '5px' }}>
          <Card.Title>{store.data.name}</Card.Title>
          <Card.Text>{store.data.shortDescription}</Card.Text>
          <Button variant="primary">Xóa</Button>
        </Card.Body>
      </Card>
    </>
  );
}
