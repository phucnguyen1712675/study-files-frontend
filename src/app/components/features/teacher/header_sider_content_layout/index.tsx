import { Space } from 'antd';
import ContentTitle from '../content_title';

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
          <ContentTitle title={component.title} />
          {component.children}
        </Space>
      ))}
    </Space>
  );
}
