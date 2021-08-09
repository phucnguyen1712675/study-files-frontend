import React from 'react';
import { Row, Col, Pagination, Typography, List } from 'antd';

import CourseCard from './components/course_card';
import LoadingCard from './components/loading_card';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getCoursesOfTeacherQueryResult } from '../../../../../features/guest/guestThunkAPI';
import { selectTeacherCourses } from '../../../../../features/guest/guestSlice';
import { ListGridType } from 'antd/lib/list';

const { Text } = Typography;

type Props = {
  limit: number;
  isCardEditable: boolean;
  gridType: ListGridType;
};

export default function CoursesPagination({
  limit,
  isCardEditable,
  gridType,
}: Props) {
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState<number>(1);

  const teacherId = localStorage.studyFiles_user_id;

  React.useEffect(() => {
    const query = `teacherId=${teacherId}&page=${page}&limit=${limit}`;
    dispatch(getCoursesOfTeacherQueryResult(query));
  }, [dispatch, limit, page, teacherId]);

  const { data, isLoading } = useAppSelector(selectTeacherCourses);

  const resultTeacherCourses = data?.results ?? [];

  const resultTotalPages = data?.totalPages ?? 0;

  const teacherTotalCourseAmount = data?.totalResults ?? 0;

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
