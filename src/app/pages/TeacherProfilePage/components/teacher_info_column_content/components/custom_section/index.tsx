import { Typography, Col } from 'antd';

const { Title } = Typography;

type Props = {
  title: string;
  content: React.ReactNode;
};

export default function CustomSection({ title, content }: Props) {
  return (
    <Col>
      <Title level={4}>{title}</Title>
      {content}
    </Col>
  );
}
