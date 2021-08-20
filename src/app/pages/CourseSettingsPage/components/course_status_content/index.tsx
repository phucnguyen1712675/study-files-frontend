import React from 'react';
import { Alert, Skeleton, Button, Space, Popconfirm, message } from 'antd';

import { checkIfEveryLectureHasVideo } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import { updateCourse } from '../../../../../features/teacher/teacherAPI';

export default function CourseStatusContent() {
  const dispatch = useAppDispatch();

  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const [
    endPromotionPopconfirmVisible,
    setEndPromotionPopconfirmVisible,
  ] = React.useState<boolean>(false);

  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);

  const handleCancel = () => setEndPromotionPopconfirmVisible(false);

  const onClickChangeStatusButton = () => {
    const hasEnoughVideo = checkIfEveryLectureHasVideo(data?.sections ?? []);

    if (!data?.status && !hasEnoughVideo) {
      message.warning(
        'Please upload enough videos before mark this Course as Completed!',
      );
    } else {
      setEndPromotionPopconfirmVisible(true);
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const { id, status } = data!;

    const payload = {
      status: !status,
    };

    const response = await updateCourse(id, payload);

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      await dispatch(getCourseDetails(id));

      window.scrollTo(0, 0);

      message.success('Processing complete!');
    }
    setEndPromotionPopconfirmVisible(false);

    setConfirmLoading(false);
  };

  const components = [
    {
      id: '1',
      title: 'Status',
      children: (
        <Space direction="vertical" size="middle">
          <Alert
            message={
              data?.status
                ? 'This course is completed.'
                : 'This course is incompleted!'
            }
            type={data?.status ? 'success' : 'warning'}
            showIcon
          />
          <Popconfirm
            title="Are you sure?"
            visible={endPromotionPopconfirmVisible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button
              type={!data?.status ? 'primary' : undefined}
              danger={data?.status}
              onClick={onClickChangeStatusButton}
            >
              {`Mark as ${data?.status ? 'Incompleted' : 'Completed'}`}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Status" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout components={components} />
      )}
    </>
  );
}
