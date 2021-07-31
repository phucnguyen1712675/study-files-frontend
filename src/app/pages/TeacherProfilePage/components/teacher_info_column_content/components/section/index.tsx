import { Typography, Col } from 'antd';

import { SectionProps } from '../../props/section_props';

const { Title } = Typography;

export default function Section(props: { section: SectionProps }) {
  const { title, content } = props.section;

  return (
    <Col>
      <Title level={4}>{title}</Title>
      {content}
    </Col>
  );
}
