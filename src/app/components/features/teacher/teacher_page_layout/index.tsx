import { Layout } from 'antd';

const { Content } = Layout;

export default function TeacherPageLayout(props: { content: JSX.Element }) {
  const { content } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '30px 280px', backgroundColor: 'white' }}>
        {content}
      </Content>
    </Layout>
  );
}
