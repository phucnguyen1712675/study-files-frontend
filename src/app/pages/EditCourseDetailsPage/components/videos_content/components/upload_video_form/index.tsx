import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Form, Modal } from 'antd';
import FileBase from 'react-file-base64';

import FormLectureOptGroupSelect from '../form_lecture_opt_group_select';
import { useAppSelector } from '../../../../../../hooks';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (video: FormValues) => void;
  onCancel: () => void;
  title: string;
}

type FormValues = {
  lectureId?: string;
  video?: string;
};

// const defaultValues = {};

export default function UploadVideoForm({
  visible,
  onCreate,
  onCancel,
  title,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const methods = useForm<FormValues>({
    // defaultValues,
  });

  const { setValue, control, watch, getValues } = methods;

  const watchVideo = watch('video');

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      onCreate(getValues());
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Edit"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{ disabled: !watchVideo }}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" name="form_in_modal">
          <FormLectureOptGroupSelect
            name="lectureId"
            label="Lecture"
            sections={courseDetails.data?.sections ?? []}
          />
          <Form.Item label="Video">
            <Controller
              control={control}
              name="video"
              render={({ field }) => (
                <FileBase
                  {...field}
                  multiple={false}
                  onDone={({ base64 }) => setValue('video', base64)}
                />
              )}
            />
          </Form.Item>
        </Form>
      </FormProvider>
    </Modal>
  );
}
