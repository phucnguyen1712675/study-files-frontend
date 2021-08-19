import React from 'react';
import { Alert, Skeleton, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { UploadVideoFormValues } from './types';
import UploadVideoForm from './components/upload_video_form';
import { checkIfEveryLectureHasVideo } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import { updateLecture } from '../../../../../features/teacher/teacherAPI';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
} from '../../../../../utils/sweet_alert_2';

export default function VideosContent() {
  const dispatch = useAppDispatch();

  const courseDetails = useAppSelector(selectCourseDetails);

  const { data, isLoading } = courseDetails;

  const [isEveryLectureHasVideo, setIsEveryLectureHasVideo] = React.useState<
    boolean
  >(!data?.status);

  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLoading && data) {
      const isHasEnoughVideo = checkIfEveryLectureHasVideo(data.sections);

      setIsEveryLectureHasVideo(isHasEnoughVideo);
    }
  }, [data, isLoading]);

  const onCreate = async (values: UploadVideoFormValues) => {
    setVisible(false);

    showLoadingSwal();

    const { lectureId, ...payload } = values;

    const response = await updateLecture(lectureId, payload);

    if (!response || response.status !== 200) {
      closeSwal();

      showErrorSwal(`Error: ${response}`);
    } else {
      const { id } = data!;

      await dispatch(getCourseDetails(id));

      window.scrollTo(0, 0);

      closeSwal();

      showSuccessSwal();
    }
  };

  const onClickBtnUpload = () => setVisible(true);

  const onCancel = () => setVisible(false);

  const components = [
    {
      id: '1',
      title: 'Upload video',
      children: (
        <>
          {data?.status ? (
            <Alert
              message="This is a completed course"
              description="Once the course is completed, new videos cannot be added."
              type="info"
              showIcon
            />
          ) : isEveryLectureHasVideo ? (
            <Alert
              message="Enough videos already"
              description="Every section of the course already has enough videos."
              type="info"
              showIcon
            />
          ) : (
            <Button icon={<UploadOutlined />} onClick={onClickBtnUpload}>
              Upload video
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Upload video" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout components={components} />
      )}
      <UploadVideoForm
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        title="Upload video"
      />
    </>
  );
}
