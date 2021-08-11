import { Card, Skeleton, Image, Typography, Button, Tooltip } from 'antd';
import { EditTwoTone, EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useAppSelector } from '../../../../../../hooks';
import { Course } from '../../../../../../../types';
import {
  getCourseDetailsPagePath,
  getCourseSettingsPagePath,
} from '../../../../../../../constants/routes';
import { selectTeacherCourses } from '../../../../../../../features/guest/guestSlice';
import { PLACEHOLDER_IMAGE_URL } from '../../../../../../../constants/images';

const { Paragraph } = Typography;
const { Meta } = Card;

type Props = {
  course: Course;
  isEditable: boolean;
};

export default function CourseCard({ course, isEditable }: Props) {
  const history = useHistory();

  const { isLoading } = useAppSelector(selectTeacherCourses);

  const navigateToCourseSettingsPage = () => {
    const { id } = course;

    const path = getCourseSettingsPagePath(id);

    history.push(path);
  };

  const navigateToCourseDetailsPage = () => {
    const { name } = course;

    const param = name.toLowerCase().replaceAll(' ', '-');

    const path = getCourseDetailsPagePath(param);

    const state = {
      course,
    };

    history.push(path, state);
  };

  const courseCardActionItems = [
    {
      id: nanoid(),
      tooltipTitle: 'Edit this course',
      icon: <EditTwoTone />,
      onClick: () => navigateToCourseSettingsPage(),
    },
    {
      id: nanoid(),
      tooltipTitle: 'View this course as a Guest',
      icon: <EyeOutlined style={{ color: 'grey' }} />,
      onClick: () => navigateToCourseDetailsPage(),
    },
  ];

  const onClick = () => navigateToCourseDetailsPage();

  return (
    <Card
      cover={
        !isLoading && (
          <Image
            src={course.image}
            preview={false}
            placeholder={<Image preview={false} src={PLACEHOLDER_IMAGE_URL} />}
          />
        )
      }
      actions={
        isEditable && !isLoading
          ? courseCardActionItems.map(item => (
              <Tooltip key={item.id} title={item.tooltipTitle}>
                <Button type="text" icon={item.icon} onClick={item.onClick} />
              </Tooltip>
            ))
          : undefined
      }
      onClick={!isEditable ? onClick : undefined}
      style={!isEditable ? { cursor: 'pointer' } : undefined}
    >
      <Skeleton loading={isLoading} avatar active>
        <Meta
          title={course.name}
          description={
            <Paragraph ellipsis={{ rows: 2 }} type="secondary">
              {course.shortDescription}
            </Paragraph>
          }
        />
      </Skeleton>
    </Card>
  );
}
