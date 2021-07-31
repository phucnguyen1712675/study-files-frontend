import React from 'react';
import { Button, Space, Skeleton, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../hooks';
import EditPictureForm from '../../../../components/features/teacher/form/edit_picture_form';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';

export default function CourseImageContent() {
  const [visible, setVisible] = React.useState(false);

  const { data, isLoading } = useAppSelector(selectCourseDetails);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <>
      <PageHelmet title="Course's picture" />
      {isLoading ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'Picture',
              contentComponent: (
                <Space
                  size="middle"
                  direction="vertical"
                  style={{ width: '100%' }}
                  align="center"
                >
                  <Image src={data?.image} />
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setVisible(true)}
                  >
                    Edit
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      )}
      <EditPictureForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
        title="Change course's picture"
        label="Choose a picture"
      />
    </>
  );
}
