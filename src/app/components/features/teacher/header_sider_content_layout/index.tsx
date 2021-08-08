import { Space, Typography, Divider } from 'antd';

const { Title } = Typography;

type Component = {
  title: string;
  children: React.ReactNode;
};

type Props = {
  components: Component[];
};

export default function HeaderSiderContentLayout({ components }: Props) {
  return (
    <Space size="large" direction="vertical" style={{ width: '100%' }}>
      {components.map((component, idx) => (
        <Space
          key={idx}
          size="middle"
          direction="vertical"
          style={{ width: '100%' }}
        >
          <Title level={3} style={{ fontWeight: 'lighter' }}>
            {component.title}
          </Title>

          <Divider style={{ margin: '0px' }} />

          {component.children}
        </Space>
      ))}
    </Space>
  );
}
