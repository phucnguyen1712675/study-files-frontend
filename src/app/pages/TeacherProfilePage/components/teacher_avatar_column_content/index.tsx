import { Row, Col } from 'antd';

import TeacherAvatar from '../../../../components/features/teacher/teacher_avatar';
import { useAppSelector } from '../../../../hooks';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';

export default function TeacherAvatarColumnContent() {
  const { data } = useAppSelector(selectTeacherInfo);

  return (
    <>
      <Row>
        <Col>
          <TeacherAvatar
            imageUrl={data?.avatar}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 100,
              xl: 200,
              xxl: 200,
            }}
          />
        </Col>
      </Row>
    </>
  );
}
