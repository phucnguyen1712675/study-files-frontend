import React from 'react';
import { Row, Col, Pagination, Typography, List } from 'antd';

import CourseCard from './components/course_card';
import LoadingCard from './components/loading_card';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getCoursesOfTeacherQueryResult } from '../../../../../features/guest/guestThunkAPI';
import { selectTeacherCourses } from '../../../../../features/guest/guestSlice';
import { GettingTeacherCoursesQuery } from '../../../../../model/query/getting_teacher_courses';

const { Text } = Typography;

export default function CoursesPagination(props: {
  limit: number;
  isCardEditable: boolean;
  gridType: object;
}) {
  const { limit, isCardEditable, gridType } = props;

  const teacherId = '60bb395c4dce1a05188ea3e0';

  const [page, setPage] = React.useState<number>(1);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getCoursesArgument: GettingTeacherCoursesQuery = {
      teacherId,
      page,
      limit: limit,
      // sortBy: 'subscriberNumber',
      // sortResults: 'desc',
    };
    dispatch(getCoursesOfTeacherQueryResult(getCoursesArgument));
  }, [dispatch, limit, page, teacherId]);

  const { data, isLoading, error } = useAppSelector(selectTeacherCourses);

  const resultTeacherCourses = data?.results ?? [];

  // for (var course of resultTeacherCourses) {
  //   console.log(course.id);
  // }

  const resultTotalPages = data?.totalPages ?? 0;
  const teacherTotalCourseAmount = data?.totalResults ?? 0;

  Object.keys(error).length !== 0 && console.log(error);

  const paginationOnChange = (page: number) => setPage(page);

  return isLoading ? (
    <Row justify="center">
      <LoadingCard />
    </Row>
  ) : resultTeacherCourses.length > 0 ? (
    <Col className="mt-4">
      <List
        grid={gridType}
        dataSource={resultTeacherCourses}
        renderItem={item => (
          <List.Item key={item.id}>
            <CourseCard course={item} isEditable={isCardEditable} />
          </List.Item>
        )}
      />
      {resultTotalPages > 1 && (
        <Row justify="center">
          <Pagination
            size="small"
            current={page}
            onChange={paginationOnChange}
            total={teacherTotalCourseAmount}
            pageSize={limit}
            className="mt-5"
          />
        </Row>
      )}
    </Col>
  ) : (
    <Row justify="center">
      <Text italic>No courses</Text>
    </Row>
  );
}
