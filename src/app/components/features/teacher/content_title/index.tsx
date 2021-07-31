import { Typography, Divider } from 'antd';

const { Title } = Typography;

export default function ContentTitle(props: { title: string }) {
  const { title } = props;

  return (
    <>
      <Title level={3} style={{ fontWeight: 'lighter' }}>
        {title}
      </Title>
      <Divider style={{ margin: '0px' }} />
    </>
  );
}
