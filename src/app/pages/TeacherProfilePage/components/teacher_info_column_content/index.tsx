import { Typography, Col, Space, Skeleton } from 'antd';

import Section from './components/section';
import CoursesPagination from '../../../../components/features/teacher/courses_pagination';
import { useAppSelector } from '../../../../hooks';
import {
  selectTeacherCourses,
  selectTeacherInfo,
} from '../../../../../features/guest/guestSlice';

const { Title, Text, Paragraph } = Typography;

export default function TeacherInfoColumnContent() {
  const teacherCourses = useAppSelector(selectTeacherCourses);
  const teacherInfo = useAppSelector(selectTeacherInfo);

  const teacherName = teacherInfo.data?.name ?? 'Name';

  const teacherShortDescription =
    teacherInfo.data?.shortDescription ?? 'Short description';

  const teacherDetailDescription = teacherInfo.data?.detailDescription ?? '';

  const teacherTotalCourseAmount = teacherCourses.data?.totalResults ?? 0;

  const sectionArray = [
    {
      title: 'About me',
      content: (
        <Paragraph style={{ fontSize: '16px' }}>
          {teacherDetailDescription}
        </Paragraph>
      ),
    },
    {
      title: `My courses (${teacherTotalCourseAmount})`,
      content: !teacherInfo.isLoading && teacherInfo.data && (
        <CoursesPagination
          teacherId={teacherInfo.data!.id}
          limit={10}
          isCardEditable={false}
          gridType={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2 }}
        />
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" size="middle">
        <Skeleton active loading={teacherInfo.isLoading}>
          <Col>
            <Title level={4} type="secondary" style={{ margin: '0px' }}>
              Instructor
            </Title>
            <Title style={{ margin: '0px' }}>{teacherName}</Title>
          </Col>
          <Col style={{ margin: '3px 0 10px 0' }}>
            <Text strong style={{ fontSize: '16px' }}>
              {teacherShortDescription}
            </Text>
          </Col>
        </Skeleton>
        <Col>
          <Space direction="vertical" size="middle">
            {sectionArray.map((section, idx) => (
              <Section
                key={idx}
                title={section.title}
                content={section.content}
              />
            ))}
          </Space>
        </Col>
      </Space>
    </>
  );
}
