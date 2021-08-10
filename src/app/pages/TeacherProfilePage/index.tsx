import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import TeacherAvatarColumnContent from './components/teacher_avatar_column_content';
import TeacherInfoColumnContent from './components/teacher_info_column_content';
import { useAppDispatch } from '../../hooks';
import PageLayoutWrapper from '../../components/features/teacher/page_layout_wrapper';
import PageHelmet from '../../components/features/teacher/page_helmet';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

const { Content } = Layout;

type LocationState = {
  teacherId: string;
};

export function TeacherProfilePage() {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const { teacherId } = location.state;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, teacherId]);

  return (
    <>
      <PageHelmet title="Teacher Profile" />
      <PageLayoutWrapper>
        <Layout style={{ backgroundColor: 'white' }}>
          <Content>
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
      </PageLayoutWrapper>
    </>
  );
}
