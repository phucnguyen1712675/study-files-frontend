import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';

import TeacherAvatarColumnContent from './components/teacher_avatar_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../hooks';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

const { Header, Footer, Content } = Layout;

interface LocationState {
  teacherId: string;
}

export function TeacherProfilePage() {
  const dispatch = useAppDispatch();

  const location = useLocation<LocationState>();

  const { teacherId } = location.state;

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch, teacherId]);

  return (
    <>
      <PageHelmet title="Teacher Profile" />
      <Layout>
        <Header>Header</Header>
        <Content style={{ backgroundColor: 'white' }}>
          <Row className="my-5">
            <Col span={14} offset={5}>
              <Row>
                <Col span={18} style={{ padding: '0px 20px' }}>
                  <TeacherInfoColumnContent />
                </Col>
                <Col span={6} style={{ padding: '0px 20px' }}>
                  <TeacherAvatarColumnContent />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}
