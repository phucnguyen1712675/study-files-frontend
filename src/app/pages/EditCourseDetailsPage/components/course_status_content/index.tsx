import React from 'react';
import { Alert, Skeleton, Button, Space, Popconfirm } from 'antd';

import { useAppSelector } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';

export default function CourseStatusContent() {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const [
    endPromotionPopconfirmVisible,
    setEndPromotionPopconfirmVisible,
  ] = React.useState(false);

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setEndPromotionPopconfirmVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setEndPromotionPopconfirmVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setEndPromotionPopconfirmVisible(false);
  };

  const alertMessage = data?.status
    ? 'This course is completed.'
    : 'This course is incompleted!';

  const alertType = data?.status ? 'success' : 'warning';

  const buttonType = !data?.status ? 'primary' : undefined;

  const buttonText = `Mark as ${data?.status ? 'Incompleted' : 'Completed'}`;

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
              contentComponent: (
                <Space direction="vertical" size="middle">
                  <Alert message={alertMessage} type={alertType} showIcon />
                  <Popconfirm
                    title="Are you sure?"
                    visible={endPromotionPopconfirmVisible}
                    onConfirm={handleOk}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                  >
                    <Button
                      type={buttonType}
                      danger={data?.status}
                      onClick={showPopconfirm}
                    >
                      {buttonText}
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
