import { Button, Row, Typography, Divider, message } from 'antd';
import { FolderOpenTwoTone, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks';
import CoursesPagination from '../../../../components/features/teacher/courses_pagination';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import { COURSE_POSTING_PAGE_PATH } from '../../../../../constants/routes';

const { Title } = Typography;

export default function CoursesColumnContent() {
  const history = useHistory();
  const { data, isLoading } = useAppSelector(selectTeacherInfo);

  const addNewCourseOnClick = () => {
    if (data?.isEmailVerified) {
      history.push(COURSE_POSTING_PAGE_PATH);
    } else {
      message.warning('Please verify email to do this task');
    }
  };

  return (
    <>
      <Row justify="center">
        <FolderOpenTwoTone style={{ fontSize: '300%' }} />
      </Row>
      <Title level={2} style={{ textAlign: 'center' }}>
        Your courses
      </Title>
      <Divider />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addNewCourseOnClick}
        >
          New
        </Button>
      </Row>
      {!isLoading && data && (
        <CoursesPagination
          teacherId={data!.id}
          limit={6}
          isCardEditable={true}
          gridType={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
        />
      )}
    </>
  );
}
