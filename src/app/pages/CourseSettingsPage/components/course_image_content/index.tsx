import React from 'react';
import { Button, Space, Skeleton, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import EditPictureForm from '../../../../components/features/teacher/form/edit_picture_form';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { EditPictureFormValues } from '../../../../../types';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import { updateCourse } from '../../../../../features/teacher/teacherAPI';
import { PLACEHOLDER_IMAGE_URL } from '../../../../../constants/images';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
} from '../../../../../utils/sweet_alert_2';

export default function CourseImageContent() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector(selectCourseDetails);

  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onCreate = async (values: EditPictureFormValues) => {
    setVisible(false);

    showLoadingSwal();

    const { id } = data!;

    const response = await updateCourse(id, values);

    if (!response || response.status !== 200) {
      closeSwal();

      showErrorSwal(`Error: ${response}`);
    } else {
      await dispatch(getCourseDetails(id));

      window.scrollTo(0, 0);

      closeSwal();

      showSuccessSwal();
    }
  };

  const onClickBtnEdit = () => setVisible(true);

  const onCancel = () => setVisible(false);

  const components = [
    {
      id: '1',
      title: 'Picture',
      children: (
        <Space
          size="middle"
          direction="vertical"
          style={{ width: '100%' }}
          align="center"
        >
          <Image
            src={data?.image}
            placeholder={<Image preview={false} src={PLACEHOLDER_IMAGE_URL} />}
          />
          <Button icon={<EditOutlined />} onClick={onClickBtnEdit}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Course's picture" />
      {isLoading ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <>
          <HeaderSiderContentLayout components={components} />
          <EditPictureForm
            visible={visible}
            onCreate={onCreate}
            onCancel={onCancel}
            title="Change course's picture"
            label="Choose a picture"
          />
        </>
      )}
    </>
  );
}
