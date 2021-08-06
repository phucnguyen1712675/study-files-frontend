import { Button, Row, Typography, Divider } from 'antd';
import { FolderOpenTwoTone, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import CoursesPagination from '../../../../components/features/teacher/courses_pagination';
import { COURSE_POSTING_PAGE_PATH } from '../../../../../constants/routes';

const { Title } = Typography;

export default function CoursesColumnContent() {
  const history = useHistory();

  const addNewCourseOnClick = () => history.push(COURSE_POSTING_PAGE_PATH);

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
      <CoursesPagination
        limit={6}
        isCardEditable={true}
        gridType={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
      />
    </>
  );
}
