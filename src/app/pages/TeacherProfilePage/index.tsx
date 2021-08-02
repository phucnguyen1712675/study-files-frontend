import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';

import TeacherAvatarColumnContent from './components/teacher_avatar_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../hooks';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';

const { Content } = Layout;

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
        <TopBar initQuery={''} />
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
      </Layout>
      <Footer />
    </>
  );
}
