import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Form, Modal, Image, Row } from 'antd';
import FileBase from 'react-file-base64';

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (image: FormValues) => void;
  onCancel: () => void;
  title: string;
  label: string;
}

type FormValues = {
  image: string;
};

const defaultValues = {
  image: '',
};

export default function EditPictureForm({
  visible,
  onCreate,
  onCancel,
  title,
  label,
}: CollectionCreateFormProps) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const methods = useForm<FormValues>({
    defaultValues,
  });

  const { setValue, control, watch, getValues } = methods;

  const watchImage = watch('image');

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
      okButtonProps={{ disabled: !watchImage }}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" name="form_in_modal">
          <Form.Item label={label}>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <FileBase
                  {...field}
                  multiple={false}
                  onDone={({ base64 }) => setValue('image', base64)}
                />
              )}
            />
          </Form.Item>
        </Form>
      </FormProvider>
      {watchImage && (
        <Row justify="center">
          <Image
            src={watchImage}
            alt="chosen"
            style={{ height: '300px' }}
            className="mb-3"
          />
        </Row>
      )}
    </Modal>
  );
}
