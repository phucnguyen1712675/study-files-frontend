import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Alert, message } from 'antd';

import CustomContent from '../custom_content';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import FormSectionSelect from '../../../../components/features/teacher/form/form_section_select';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormCheckbox from '../../../../components/features/teacher/form/form_checkbox';
import FormFileBase64 from '../../../../components/features/teacher/form/form_file_base_64';
import {
  LECTURE_TITLE_MIN_LENGTH,
  LECTURE_TITLE_MAX_LENGTH,
} from '../../../../../constants/lecture';
import { getSectionsResults } from '../../../../../features/teacher/teacherThunkAPI';
import {
  selectNewCourseSections,
  selectNewCourseId,
  clearNewCourseId,
} from '../../../../../features/teacher/teacherSlice';
import { showLoadingSwal, closeSwal } from '../../../../../utils/sweet_alert_2';
import { Section } from '../../../../../model/section';
import {
  addLecture,
  getLecturesTotalResults,
  getSectionsDetailsResults,
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

export default function AddLecturesContent() {
  const newCourseId = useAppSelector(selectNewCourseId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getSectionsResults(newCourseId!));
  }, [dispatch, newCourseId]);

  const newCourseSections = useAppSelector(selectNewCourseSections);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [shouldShowNextButton, setShouldShowNextButton] = React.useState<
    boolean
  >(false);

  const [lectureCount, setLectureCount] = React.useState<number>(0);

  const [
    isEachSectionHadAtLeastOneLecture,
    setIsEachSectionHadAtLeastOneLecture,
  ] = React.useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch, reset } = methods;

  const watchSectionId = watch('sectionId');

  const getLectureCount = async (sectionId: string) => {
    const totalResults = await getLecturesTotalResults(sectionId);

    setLectureCount(totalResults);
  };

  const sectionChangeHandler = async (sectionId: string) => {
    showLoadingSwal();

    await getLectureCount(sectionId);

    closeSwal();
  };

  var videoKey = Date.now();

  const checkIfDone = async () => {
    const sectionDetailsResults: Section[] = await getSectionsDetailsResults(
      newCourseId!,
    );

    const result = sectionDetailsResults.every(
      section => section.lectures.length > 0,
    );

    return result;
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

      reset({
        sectionId: watchSectionId,
        canPreview: false,
      });

      await getLectureCount(values.sectionId);

      const isDone = await checkIfDone();

      isDone && setIsEachSectionHadAtLeastOneLecture(true);

      videoKey = Date.now();
    }

    setLoading(false);
  });

  const onDone = () => {
    dispatch(clearNewCourseId());

    setShouldShowNextButton(true);
  };

  return (
    <>
      <PageHelmet title="Lecture & Video" />
      <CustomContent
        step={2}
        shouldShowNextButton={shouldShowNextButton}
        children={
          <>
            <Alert
              message="Guide"
              showIcon
              description=" Press the DONE Button when you have added at least one lecture for
              each sections"
              type="info"
              action={
                <Button
                  size="small"
                  type="primary"
                  onClick={onDone}
                  disabled={!isEachSectionHadAtLeastOneLecture}
                >
                  DONE
                </Button>
              }
            />
            <FormProvider {...methods}>
              <Form layout="vertical" onFinish={onFinish}>
                {!newCourseSections.isLoading && newCourseSections.data && (
                  <FormSectionSelect
                    name="sectionId"
                    label="Section"
                    sections={newCourseSections.data}
                    checkDisabledForSection={false}
                    changeHandler={sectionChangeHandler}
                  />
                )}

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
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form>
            </FormProvider>
          </>
        }
      />
    </>
  );
}
