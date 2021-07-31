import React from 'react';
import { Alert, Skeleton, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import UploadVideoForm from './components/upload_video_form';
import { useAppSelector } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';

export default function VideosContent() {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data, isLoading } = courseDetails;

  const [isEveryLectureHasVideo, setIsEveryLectureHasVideo] = React.useState<
    boolean
  >(!data?.status);

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Load data successfully
    if (!isLoading && data) {
      const checkIfEveryLectureHasVideo = data.sections.every(section =>
        section.lectures.every(lecture => lecture.videoUrl),
      );
      setIsEveryLectureHasVideo(checkIfEveryLectureHasVideo);
    }
  }, [data, isLoading]);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <>
      <PageHelmet title="Upload video" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'Upload video',
              contentComponent: (
                // <Button
                //   icon={<UploadOutlined />}
                //   onClick={() => setVisible(true)}
                // >
                //   Upload video
                // </Button>

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
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => setVisible(true)}
                    >
                      Upload video
                    </Button>
                  )}
                </>
              ),
            },
          ]}
        />
      )}
      <UploadVideoForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
        title="Upload video"
      />
    </>
  );
}
