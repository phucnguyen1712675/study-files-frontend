import { Button, Typography, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import TeacherAvatar from '../../../../components/features/teacher/teacher_avatar';
import { useAppSelector } from '../../../../hooks';
import { TEACHER_SETTINGS_PAGE_PATH } from '../../../../../constants/routes';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';

const { Title } = Typography;

export default function TeacherInfoColumnContent() {
  const history = useHistory();

  const { data } = useAppSelector(selectTeacherInfo);

  const teacherName = data?.name ?? 'Name';

  const teacherEmail = data?.email ?? 'email@gmail.com';

  const editProfileOnClick = () => history.push(TEACHER_SETTINGS_PAGE_PATH);

  return (
    <>
      <Row justify="center">
        <Col>
          <TeacherAvatar
            imageUrl={data?.avatar}
            size={{ xs: 24, sm: 32, md: 80, lg: 150, xl: 250, xxl: 250 }}
          />
        </Col>
      </Row>
      <Title level={2} className="mt-3" style={{ margin: '0px' }}>
        {teacherName}
      </Title>
      <Title
        level={4}
        type="secondary"
        style={{ margin: '0px', fontWeight: 'lighter' }}
      >
        {teacherEmail}
      </Title>
      <Button className="mt-3" block onClick={editProfileOnClick}>
        Edit profile
      </Button>
    </>
  );
}
