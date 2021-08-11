import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Skeleton, Button, Alert, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

import {
  UpdateLectureInfoFormValues,
  UpdateLectureOrdinalNumberFormValues,
} from './types';
import UpdateLectureInfoForm from './components/update_lecture_info_form';
import UpdateLectureOrdinalNumberForm from './components/update_lecture_ordinal_number_form';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import FormSectionSelect from '../../../../components/features/teacher/form/form_section_select';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormCheckbox from '../../../../components/features/teacher/form/form_checkbox';
import FormFileBase64 from '../../../../components/features/teacher/form/form_file_base_64';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  LECTURE_TITLE_MIN_LENGTH,
  LECTURE_TITLE_MAX_LENGTH,
} from '../../../../../constants/lecture';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
} from '../../../../../utils/sweet_alert_2';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import {
  addLecture,
  getLecturesTotalResults,
  updateLecture,
  swapLectureOrdinalNumber,
} from '../../../../../features/teacher/teacherAPI';

type FormValues = {
  sectionId: string;
  title: string;
  canPreview: boolean;
  video: string;
};

const schema = yup.object().shape({
  sectionId: yup.string().required('Section is Required'),
  title: yup
    .string()
    .min(LECTURE_TITLE_MIN_LENGTH)
    .max(LECTURE_TITLE_MAX_LENGTH)
    .required('Title is Required'),
  canPreview: yup.boolean(),
  video: yup.string().when('canPreview', {
    is: true,
    then: yup
      .string()
      .required('Video is required when Lecture can be previewed'),
  }),
});

var videoKey = nanoid();

export default function CourseLectureContent() {
  const dispatch = useAppDispatch();

  const courseDetails = useAppSelector(selectCourseDetails);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [lectureCount, setLectureCount] = React.useState<number>(0);

  const [
    updateLectureInfoFormVisible,
    setUpdateLectureInfoFormVisible,
  ] = React.useState<boolean>(false);

  const [
    updateLectureOrdinalNumberFormVisible,
    setUpdateLectureOrdinalNumberFormVisible,
  ] = React.useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch, reset } = methods;

  const watchSectionId = watch('sectionId');

  const watchTitle = watch('title');

  const watchVideo = watch('video');

  const getLectureCount = async (sectionId: string) => {
    const totalResults = await getLecturesTotalResults(sectionId);

    setLectureCount(totalResults);
  };

  const sectionChangeHandler = async (sectionId: string) => {
    showLoadingSwal();

    await getLectureCount(sectionId);

    closeSwal();
  };

  const onFinish = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    var payload: object;

    if (values.video) {
      payload = values;
    } else {
      const { video, ...rest } = values;

      payload = rest;
    }

    const response = await addLecture(payload);

    if (!response || response.status !== 201) {
      message.error(`Error: ${response}`);
    } else {
      message.success('Processing complete!');

      dispatch(getCourseDetails(courseDetails.data!.id));

      reset();

      await getLectureCount(values.sectionId);

      videoKey = nanoid();
    }

    setLoading(false);
  });

  const onCreateUpdateLectureInfoForm = async (
    values: UpdateLectureInfoFormValues,
  ) => {
    setUpdateLectureInfoFormVisible(false);

    showLoadingSwal();

    const { lectureId, ...payload } = values;

    const response = await updateLecture(lectureId, payload);

    closeSwal();

    if (!response || response.status !== 200) {
      showErrorSwal(`Error: ${response}`);
    } else {
      showSuccessSwal();

      const { id } = courseDetails.data!;

      dispatch(getCourseDetails(id));
    }
  };

  const onCreateUpdateLectureOrdinalNumberForm = async (
    values: UpdateLectureOrdinalNumberFormValues,
  ) => {
    setUpdateLectureOrdinalNumberFormVisible(false);

    showLoadingSwal();

    const { sectionId, ...payload } = values;

    const response = await swapLectureOrdinalNumber(payload);

    closeSwal();

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      showSuccessSwal();

      const { id } = courseDetails.data!;

      dispatch(getCourseDetails(id));
    }
  };

  const onClickBtnUpdateLectureInfo = () =>
    setUpdateLectureInfoFormVisible(true);

  const onClickBtnUpdateLectureOrdinalNumber = () =>
    setUpdateLectureOrdinalNumberFormVisible(true);

  const onCancelUpdateLectureInfoVisible = () =>
    setUpdateLectureInfoFormVisible(false);

  const onCancelUpdateLectureOrdinalNumberVisible = () =>
    setUpdateLectureOrdinalNumberFormVisible(false);

  const components = [
    {
      id: nanoid(),
      title: "Update lecture's info",
      children: (
        <>
          {courseDetails.data?.sections &&
          courseDetails.data?.sections.some(
            section => section.lectures.length > 0,
          ) ? (
            <Button
              icon={<EditOutlined />}
              onClick={onClickBtnUpdateLectureInfo}
            >
              Click to update
            </Button>
          ) : (
            <Alert message="No lecture to update!" type="info" showIcon />
          )}
        </>
      ),
    },
    {
      id: nanoid(),
      title: "Update lecture's ordinal number",
      children: (
        <>
          {courseDetails.data?.sections &&
          courseDetails.data?.sections.some(
            section => section.lectures.length > 1,
          ) ? (
            <Button
              icon={<EditOutlined />}
              onClick={onClickBtnUpdateLectureOrdinalNumber}
            >
              Click to update
            </Button>
          ) : (
            <Alert
              message="No section have enough lecture to swap ordinal number!"
              type="info"
              showIcon
            />
          )}
        </>
      ),
    },
    {
      id: nanoid(),
      title: 'New',
      children: (
        <>
          {!watchSectionId && (
            <Alert
              message="First choose a section to add lecture"
              type="info"
              showIcon
            />
          )}
          <FormProvider {...methods}>
            <Form layout="vertical" onFinish={onFinish}>
              <FormSectionSelect
                name="sectionId"
                label="Section"
                sections={courseDetails.data?.sections ?? []}
                checkDisabledForSection={false}
                changeHandler={sectionChangeHandler}
              />
              {watchSectionId && (
                <>
                  <FormInput
                    name="title"
                    label={`Title for Lecture ${lectureCount + 1}`}
                    placeholder="Enter title"
                  />
                  <FormCheckbox
                    name="canPreview"
                    label="This course is can be previewed"
                    defaultChecked={false}
                  />
                  <FormFileBase64
                    name="video"
                    label="Video"
                    fileKey={videoKey}
                    desiredFileType="video"
                  />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={!watchSectionId || !watchTitle || !watchVideo}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </FormProvider>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Lecture" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 16 }} />
      ) : !courseDetails.data?.status ? (
        <>
          <HeaderSiderContentLayout components={components} />
          <UpdateLectureInfoForm
            visible={updateLectureInfoFormVisible}
            onCreate={onCreateUpdateLectureInfoForm}
            onCancel={onCancelUpdateLectureInfoVisible}
          />
          <UpdateLectureOrdinalNumberForm
            visible={updateLectureOrdinalNumberFormVisible}
            onCreate={onCreateUpdateLectureOrdinalNumberForm}
            onCancel={onCancelUpdateLectureOrdinalNumberVisible}
          />
        </>
      ) : (
        <Alert
          message="This is a completed course"
          description="Once the course is completed, lecture cannot be added or updated."
          type="info"
          showIcon
        />
      )}
    </>
  );
}
