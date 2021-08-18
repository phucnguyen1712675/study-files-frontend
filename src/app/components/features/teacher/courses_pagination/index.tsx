import React from 'react';
import { Row, Col, Pagination, List, Empty } from 'antd';
import { ListGridType } from 'antd/lib/list';

import CourseCard from './components/course_card';
import LoadingCard from '../loading_card';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getCoursesOfTeacherQueryResult } from '../../../../../features/guest/guestThunkAPI';
import { selectTeacherCourses } from '../../../../../features/guest/guestSlice';

// const { Text } = Typography;

type Props = {
  limit: number;
  isCardEditable: boolean;
  gridType: ListGridType;
  teacherId: string;
};

export default function CoursesPagination({
  limit,
  isCardEditable,
  gridType,
  teacherId,
}: Props) {
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState<number>(1);

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
  ) : resultTeacherCourses.length === 0 ? (
    <Empty description="No courses" />
  ) : (
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
  );
}
