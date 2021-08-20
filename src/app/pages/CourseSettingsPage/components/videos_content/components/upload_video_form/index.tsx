import { useForm, FormProvider } from 'react-hook-form';
import { Form, Modal } from 'antd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FormLectureOptGroupSelect from '../../../form_lecture_opt_group_select';
import { UploadVideoFormValues } from '../../types';
import { useAppSelector } from '../../../../../../../hooks';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';
import FormFileBase64 from '../../../../../../components/features/teacher/form/form_file_base_64';

const schema = yup.object().shape({
  lectureId: yup.string().required('Lecture is Required'),
  video: yup.string().required('Video is Required'),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: UploadVideoFormValues) => Promise<void>;
  onCancel: () => void;
  title: string;
};

export default function UploadVideoForm({
  visible,
  onCreate,
  onCancel,
  title,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const methods = useForm<UploadVideoFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { reset, watch, getValues } = methods;

  const watchLectureId = watch('lectureId');

  const watchVideo = watch('video');

  const handleOk = async () => {
    const values = getValues();

    await onCreate({ ...values, video: watchVideo });

    reset();
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{ disabled: !watchLectureId || !watchVideo }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" name="form_in_modal">
          <FormLectureOptGroupSelect
            name="lectureId"
            label="Lecture"
            sections={courseDetails.data?.sections ?? []}
            checkDisabledForLecture={true}
          />
          {watchLectureId && (
            <FormFileBase64
              name="video"
              label="Video"
              desiredFileType="video"
            />
          )}
        </Form>
      </FormProvider>
    </Modal>
  );
}
