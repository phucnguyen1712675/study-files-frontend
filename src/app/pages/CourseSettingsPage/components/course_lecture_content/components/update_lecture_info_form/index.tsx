import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal, Alert, message } from 'antd';

import { UpdateLectureInfoFormValues } from '../../models/update_lecture_info_form_values';
import FormLectureOptGroupSelect from '../../../form_lecture_opt_group_select';
import { useAppSelector } from '../../../../../../hooks';
import FormInput from '../../../../../../components/features/teacher/form/form_input';
import FormCheckbox from '../../../../../../components/features/teacher/form/form_checkbox';
import {
  LECTURE_TITLE_MIN_LENGTH,
  LECTURE_TITLE_MAX_LENGTH,
} from '../../../../../../../constants/lecture';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const schema = yup.object().shape({
  lectureId: yup.string().required('Lecture is Required'),
  title: yup
    .string()
    .min(LECTURE_TITLE_MIN_LENGTH)
    .max(LECTURE_TITLE_MAX_LENGTH)
    .required('Title is Required'),
  canPreview: yup.boolean(),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: UpdateLectureInfoFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function UpdateLectureInfoForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const sections = React.useMemo(() => {
    return data?.sections ?? [];
  }, [data]);

  const [currentLectureTitle, setCurrentLectureTitle] = React.useState<string>(
    '',
  );

  const [
    currentLectureCanPreviewValue,
    setCurrentLectureCanPreviewValue,
  ] = React.useState<boolean>(false);

  const [currentLectureVideoUrl, setCurrentLectureVideoUrl] = React.useState<
    string
  >('');

  const methods = useForm<UpdateLectureInfoFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, getValues, setValue, reset } = methods;

  const watchLectureId = watch('lectureId');

  const watchTitle = watch('title');

  const watchCanPreview = watch('canPreview');

  React.useEffect(() => {
    if (watchLectureId) {
      const sectionToLookup =
        sections.find(section =>
          section.lectures.find(lecture => lecture.id === watchLectureId),
        ) ?? sections[0];

      const currentLecture = sectionToLookup.lectures.find(
        lecture => lecture.id === watchLectureId,
      );
      const currentTitle = currentLecture?.title ?? '';

      const currentCanPreviewValue = currentLecture?.canPreview ?? false;

      const currentVideoUrl = currentLecture?.videoUrl ?? '';

      setCurrentLectureTitle(currentTitle);

      setCurrentLectureCanPreviewValue(currentCanPreviewValue);

      setCurrentLectureVideoUrl(currentVideoUrl);

      setValue('title', currentTitle);

      setValue('canPreview', currentCanPreviewValue);
    }
  }, [sections, setValue, watchLectureId]);

  React.useEffect(() => {
    if (watchCanPreview && !currentLectureVideoUrl) {
      message.warning(
        'Please upload video for this lecture and then it can be previewed',
      );

      setValue('canPreview', false);

      currentLectureCanPreviewValue && setCurrentLectureCanPreviewValue(false);
    }
  }, [
    currentLectureCanPreviewValue,
    currentLectureVideoUrl,
    setValue,
    watchCanPreview,
  ]);

  const handleOk = async () => {
    await onCreate(getValues());

    reset();

    setCurrentLectureTitle('');

    setCurrentLectureCanPreviewValue(false);

    setCurrentLectureVideoUrl('');
  };

  return (
    <Modal
      visible={visible}
      title="Update lecture's info"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled:
          !watchLectureId ||
          !watchTitle ||
          (currentLectureTitle === watchTitle &&
            currentLectureCanPreviewValue === watchCanPreview),
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical">
          <FormLectureOptGroupSelect
            name="lectureId"
            label="Lecture"
            sections={sections}
            checkDisabledForLecture={false}
          />
          {watchLectureId && (
            <>
              <FormInput name="title" label="Title" />
              <FormCheckbox
                name="canPreview"
                label="This course is can be previewed"
              />
              {!currentLectureVideoUrl && (
                <Alert
                  message="This lecture has no video to be previewed!"
                  type="info"
                  showIcon
                />
              )}
            </>
          )}
        </Form>
      </FormProvider>
    </Modal>
  );
}
