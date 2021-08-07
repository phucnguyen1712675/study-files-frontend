import { Layout } from 'antd';

import PageLayoutWrapper from '../page_layout_wrapper';

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function TeacherPageLayout({ children }: Props) {
  return (
    <PageLayoutWrapper>
      <Layout
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Content style={{ padding: '30px 0', width: '65%' }}>
          {children}
        </Content>
      </Layout>
    </PageLayoutWrapper>
  );
}
