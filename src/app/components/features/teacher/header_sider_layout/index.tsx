import React from 'react';
import { Layout, Typography, Menu } from 'antd';
import {
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useLocation,
  useHistory,
  Switch,
} from 'react-router-dom';

import './index.css';

import TeacherPageLayout from '../teacher_page_layout';

const { Content, Sider } = Layout;
const { Text } = Typography;

type Props = {
  siderItems: any[];
  headerContainer?: React.ReactNode;
  siderHeaderText: string;
};

export default function HeaderSiderLayout({
  siderItems,
  headerContainer,
  siderHeaderText,
}: Props) {
  let { url } = useRouteMatch();

  const location = useLocation();

  const history = useHistory();

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(
    siderItems.find(_item =>
      location.pathname.startsWith(`${url}/${_item.path}`),
    )?.id,
  );

  const onClickMenu = item => {
    const clicked = siderItems.find(_item => _item.id === item.key);
    history.push(`${url}/${clicked?.path}` ?? siderItems[0].path);
  };

  React.useEffect(() => {
    setSelectedKey(
      siderItems.find(_item =>
        location.pathname.startsWith(`${url}/${_item.path}`),
      )?.id,
    );
  }, [location, siderItems, url]);

  return (
    <TeacherPageLayout>
      <>
        {headerContainer}
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width="20%">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey ?? siderItems[0].id]}
              onClick={onClickMenu}
            >
              <Menu.Item key="header" disabled>
                <Text strong>{siderHeaderText}</Text>
              </Menu.Item>

              {siderItems.map(item => (
                <Menu.Item key={item.id}>
                  <Link to={`${url}/${item.path}`}>{item.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280, minWidth: 600 }}>
            <Switch>
              <Route exact path={url}>
                <Redirect to={`${url}/${siderItems[0].path}`} />
              </Route>

              {siderItems.map(item => (
                <Route
                  key={item.id}
                  path={`${url}/${item.path}`}
                  component={item.component}
                />
              ))}
            </Switch>
          </Content>
        </Layout>
      </>
    </TeacherPageLayout>
  );
}
