import { Card, Skeleton, Image, Typography, Button, Tooltip } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Course } from '../../../../../../../model/course';
import { useAppSelector } from '../../../../../../hooks';
import { selectTeacherCourses } from '../../../../../../../features/guest/guestSlice';

const { Paragraph } = Typography;
const { Meta } = Card;

const courseCardActionItems = [
  {
    tooltipTitle: 'Setting',
    icon: <SettingOutlined style={{ color: 'grey' }} />,
  },
  {
    tooltipTitle: 'Edit',
    icon: <EditOutlined style={{ color: 'grey' }} />,
  },
  {
    tooltipTitle: 'More',
    icon: <EllipsisOutlined style={{ color: 'grey' }} />,
  },
];

export default function CourseCard(props: {
  course: Course;
  isEditable: boolean;
}) {
  const { course, isEditable } = props;

  const { isLoading } = useAppSelector(selectTeacherCourses);

  return (
    <Card
      // style={{ height: 200 }}
      // loading={isLoading}
      cover={!isLoading && <Image src={course.image} />}
      actions={
        isEditable && !isLoading
          ? courseCardActionItems.map((item, idx) => (
              <Tooltip key={idx} title={item.tooltipTitle}>
                <Button type="text" icon={item.icon} />
              </Tooltip>
            ))
          : undefined
      }
    >
      <Skeleton loading={isLoading} avatar active>
        <Meta
          title={course.name}
          description={
            <Paragraph ellipsis={{ rows: 2 }} type="secondary">
              {course.shortDescription}
            </Paragraph>
          }
          // description={course.shortDescription}
        />
      </Skeleton>
    </Card>
  );
}
