import { axiosInstance } from 'api';
import * as React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Card, Button } from 'react-bootstrap';
import reducer from '../reducer';

export function MyCourseCard({ course, deleteFunction }) {
  const initialAppState = {
    query: '',
    items: [],
  };

  const [store, dispatch] = useReducer(reducer, initialAppState);

  useEffect(
    function () {
      async function loadCourse() {
        const res = await axiosInstance.get(`courses/${course.courseId}`);
        console.log(res.data);
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

  /* const btnDelete_Clicked = async function () {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    try {
      const res = await axiosInstance.delete(
        `/student/myCourses/${course.id}`,
        config,
      );

      if (res.status === 204) {
        myCoursesDispacth({
          type: 'delete',
          payload: {
            items: res.data,
            query: '',
          },
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }; */

  return (
    <>
      <Card style={{ width: '18rem', border: '1px solid #000000' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body style={{ padding: '5px' }}>
          <Card.Title>{store.items.name}</Card.Title>
          <Card.Text>
            <div style={{ fontSize: '10px' }}>
              {store.items.shortDescription}
            </div>
            <div>{store.items.shortDescription}</div>
          </Card.Text>
          <Button variant="primary" onClick={deleteFunction}>
            Xóa
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
