import * as React from 'react';
import { Card, Button } from 'react-bootstrap';

export function CourseCard({ course }) {
  return (
    <>
      <Card style={{ width: '18rem', border: '1px solid #000000' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body style={{ padding: '5px' }}>
          <Card.Title>{course.name}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
          <Button variant="primary">Subcribe</Button>
        </Card.Body>
      </Card>
    </>
  );
}

/*const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];*/
