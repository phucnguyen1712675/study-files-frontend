import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import CoursesColumnContent from './components/courses_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../hooks';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';

const { Content } = Layout;

const teacherId = localStorage.studyFiles_user_id;

export function TeacherCoursesPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch]);

  return (
    <>
      <PageHelmet title="Your courses" />
      <TopBar initQuery={''} />
      <Layout>
        <Content style={{ backgroundColor: 'white' }}>
          <Divider className="mt-4" />
          <Row className="mb-5">
            <Col span={20} offset={2}>
              <Row>
                <Col span={6} style={{ padding: '0px 20px' }}>
                  <TeacherInfoColumnContent />
                </Col>
                <Col span={18} style={{ padding: '0px 20px' }}>
                  <CoursesColumnContent />
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
