import { Space, Typography, Divider } from 'antd';

const { Title } = Typography;

type Component = {
  id: string;
  title?: string;
  children: React.ReactNode;
};

type Props = {
  components: Component[];
};

export default function HeaderSiderContentLayout({ components }: Props) {
  return (
    <Space size="large" direction="vertical" style={{ width: '100%' }}>
      {components.map(component => (
        <Space
          key={component.id}
          size="middle"
          direction="vertical"
          style={{ width: '100%' }}
        >
          {component.title && (
            <>
              <Title level={3} style={{ fontWeight: 'lighter' }}>
                {component.title}
              </Title>

              <Divider style={{ margin: '0px' }} />
            </>
          )}

          {component.children}
        </Space>
      ))}
    </Space>
  );
}
