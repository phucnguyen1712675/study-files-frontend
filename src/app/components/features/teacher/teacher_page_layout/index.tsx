import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default function TeacherPageLayout(props: { content: JSX.Element }) {
  const { content } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">Header</Header>
      <Content style={{ padding: '0 280px', backgroundColor: 'white' }}>
        {content}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Study-files ©2021 Created by Study-files team
      </Footer>
    </Layout>
  );
}
