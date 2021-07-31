import React from 'react';
import { Layout, Typography, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import './index.css';

import TeacherPageLayout from '../teacher_page_layout';

const { Content, Sider } = Layout;
const { Text } = Typography;

export default function HeaderSiderLayout(props: {
  siderItems: any[];
  headerContainer?: JSX.Element;
  siderHeaderText: string;
}) {
  const { siderItems, headerContainer, siderHeaderText } = props;

  let { path, url } = useRouteMatch();

  const location = useLocation();

  const history = useHistory();

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(
    siderItems.find(_item =>
      location.pathname.startsWith(`${path}/${_item.path}`),
    )?.path,
  );

  const onClickMenu = item => {
    const clicked = siderItems.find(_item => _item.path === item.key);
    history.push(`${path}/${clicked?.path}` ?? siderItems[0].path);
  };

  React.useEffect(() => {
    setSelectedKey(
      siderItems.find(_item =>
        location.pathname.startsWith(`${path}/${_item.path}`),
      )?.path,
    );
  }, [location, path, siderItems]);

  return (
    <TeacherPageLayout
      content={
        <>
          {headerContainer}
          <Router>
            <Layout
              className="site-layout-background"
              style={{ padding: '24px 0' }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedKey ?? siderItems[0].path]}
                  onClick={onClickMenu}
                >
                  <Menu.Item key="header" disabled>
                    <Text strong>{siderHeaderText}</Text>
                  </Menu.Item>

                  {siderItems.map(item => (
                    <Menu.Item key={item.path}>
                      <Link to={`${url}/${item.path}`}>{item.title}</Link>
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Content
                style={{ padding: '0 24px', minHeight: 280, minWidth: 600 }}
              >
                <Route exact path={path}>
                  <Redirect to={`${path}/${siderItems[0].path}`} />
                </Route>

                {siderItems.map(item => (
                  <Route
                    key={item.path}
                    path={`${path}/${item.path}`}
                    component={item.component}
                  />
                ))}
              </Content>
            </Layout>
          </Router>
        </>
      }
    />
  );
}
