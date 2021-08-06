import { Layout } from 'antd';

import PageLayout from '../page_layout';

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function TeacherPageLayout({ children }: Props) {
  return (
    <PageLayout
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Content style={{ width: '65%' }}>{children}</Content>
    </PageLayout>
  );
}
