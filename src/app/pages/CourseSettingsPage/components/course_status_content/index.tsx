import React from 'react';
import { Alert, Skeleton, Button, Space, Popconfirm, message } from 'antd';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
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

  const showPopconfirm = () => setEndPromotionPopconfirmVisible(true);

  const handleCancel = () => setEndPromotionPopconfirmVisible(false);

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
      message.success('Processing complete!');

      dispatch(getCourseDetails(id));
    }
    setEndPromotionPopconfirmVisible(false);

    setConfirmLoading(false);
  };

  return (
    <>
      <PageHelmet title="Status" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
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
                      onClick={showPopconfirm}
                    >
                      {`Mark as ${data?.status ? 'Incompleted' : 'Completed'}`}
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
