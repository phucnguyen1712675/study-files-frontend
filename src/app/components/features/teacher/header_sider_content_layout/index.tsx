import { Space } from 'antd';
import ContentTitle from '../content_title';

export default function HeaderSiderContentLayout(props: {
  components: {
    title: string;
    contentComponent: JSX.Element;
  }[];
}) {
  const { components } = props;

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
          {component.contentComponent}
        </Space>
      ))}
    </Space>
  );
}
