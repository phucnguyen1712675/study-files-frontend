import { Typography, Divider } from 'antd';

const { Title } = Typography;

type Props = {
  title: string;
};

export default function ContentTitle({ title }: Props) {
  return (
    <>
      <Title level={3} style={{ fontWeight: 'lighter' }}>
        {title}
      </Title>
      <Divider style={{ margin: '0px' }} />
    </>
  );
}
