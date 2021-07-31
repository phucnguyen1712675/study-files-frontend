import React from 'react';
import { Layout, Steps, Row, Col, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';

import './index.css';

import { STEP_ITEMS } from './constants';
import { useAppSelector } from '../../hooks';
import TeacherPageLayout from '../../components/features/teacher/teacher_page_layout';
import { selectCoursePostingStep } from '../../../features/teacher/teacherSlice';

const { Content } = Layout;
const { Step } = Steps;
const { Text } = Typography;

export function CoursePostingPage() {
  const coursePostingStep = useAppSelector(selectCoursePostingStep);

  let { path } = useRouteMatch();

  const [current, setCurrent] = React.useState<number>(coursePostingStep);

  React.useEffect(() => {
    setCurrent(coursePostingStep);
  }, [coursePostingStep]);

  return (
    <TeacherPageLayout
      content={
        <Router>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Row>
              <Col span={6}>
                <Steps
                  direction="vertical"
                  size="small"
                  current={current}
                  //   style={{ backgroundColor: 'yellow' }}
                >
                  {STEP_ITEMS.map((item, idx) => (
                    <Step
                      key={idx}
                      title={
                        <Text style={{ fontSize: '16px' }}>{item.title}</Text>
                      }
                      description={
                        <Text type="secondary" style={{ fontSize: '13px' }}>
                          {item.description}
                        </Text>
                      }
                    />
                  ))}
                </Steps>
              </Col>
              <Col span={18}>
                <Content
                  style={{
                    padding: '0 24px',
                    minHeight: 280,
                    minWidth: 600,
                    // backgroundColor: 'blue',
                  }}
                >
                  <Route exact path={path}>
                    <Redirect to={`${path}/${STEP_ITEMS[0].path}`} />
                  </Route>

                  {STEP_ITEMS.map(item => (
                    <Route
                      key={item.path}
                      path={`${path}/${item.path}`}
                      component={item.component}
                    />
                  ))}
                </Content>
              </Col>
            </Row>
          </Layout>
        </Router>
      }
    />
  );
}
