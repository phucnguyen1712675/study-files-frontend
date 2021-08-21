import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import CoursesColumnContent from './components/courses_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../../hooks';
import PageLayoutWrapper from '../../components/features/teacher/page_layout_wrapper';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

const { Content } = Layout;

export function TeacherCoursesPage() {
  const dispatch = useAppDispatch();

  const teacherId = localStorage.studyFiles_user_id;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch, teacherId]);

  return (
    <>
      <PageHelmet title="Your courses" />
      <PageLayoutWrapper>
        <Layout
          style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Content>
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
      </PageLayoutWrapper>
    </>
  );
}
