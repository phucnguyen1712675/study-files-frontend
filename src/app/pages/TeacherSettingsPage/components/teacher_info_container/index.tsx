import { Row, Col, Typography, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks';
import TeacherAvatar from '../../../../components/features/teacher/teacher_avatar';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import { getTeacherProfilePagePath } from '../../../../../constants/routes';

const { Title, Text } = Typography;

export default function TeacherInfoContainer() {
  const history = useHistory();

  const { data } = useAppSelector(selectTeacherInfo);

  const teacherName = data?.name ?? 'Name';

  const navigateToTeacherPersonalProfilePage = () => {
    const { id, name } = data!;
    const param = name.toLowerCase().replaceAll(' ', '-');
    const path = getTeacherProfilePagePath(param);
    const state = {
      teacherId: id,
    };

    history.push(path, state);
  };

  return (
    <Row justify="space-between" style={{ margin: '25px 0' }}>
      <Col>
        <Space size="middle">
          <TeacherAvatar
            imageUrl={data?.avatar}
            size={{ xs: 24, sm: 32, md: 32, lg: 32, xl: 48, xxl: 48 }}
          />
          <Col>
            <Title level={3} style={{ margin: '0px' }}>
              {teacherName}
            </Title>
            <Text type="secondary">Your personal account</Text>
          </Col>
        </Space>
      </Col>
      <Col>
        <Button size="small" onClick={navigateToTeacherPersonalProfilePage}>
          Go to your personal profile
        </Button>
      </Col>
    </Row>
  );
}
