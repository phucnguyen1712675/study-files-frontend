import React from 'react';
import { Layout, Row, Col } from 'antd';

import TeacherAvatarColumnContent from './components/teacher_avatar_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../hooks';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

const { Header, Footer, Content } = Layout;

export function TeacherProfilePage() {
  const teacherId = '60bb395c4dce1a05188ea3e0';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch]);

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
