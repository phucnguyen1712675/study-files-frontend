import { useForm, FormProvider } from 'react-hook-form';
import { Form, Modal, Image, Row } from 'antd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FormFileBase64 from '../form_file_base_64';
import { EditPictureFormValues } from '../../../../../../model/edit_picture_form_values';
import { PLACEHOLDER_IMAGE_URL } from '../../../../../../constants/images';

const schema = yup.object().shape({
  image: yup.string().required('Image is Required'),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: EditPictureFormValues) => Promise<void>;
  onCancel: () => void;
  title: string;
  label: string;
};

export default function EditPictureForm({
  visible,
  onCreate,
  onCancel,
  title,
  label,
}: CollectionCreateFormProps) {
  const methods = useForm<EditPictureFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, reset } = methods;

  const watchImage = watch('image');

  const handleOk = async () => {
    // To fix bug
    const values = {
      image: watchImage,
    };

    await onCreate(values);

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
      okButtonProps={{ disabled: !watchImage }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" name="form_in_modal">
          <FormFileBase64 name="image" label={label} desiredFileType="image" />
        </Form>
      </FormProvider>
      {watchImage && (
        <Row justify="center">
          <Image
            src={watchImage}
            alt="chosen"
            style={{ height: '300px' }}
            className="mb-3"
            placeholder={
              <Image
                preview={false}
                className="mb-3"
                style={{ height: '300px' }}
                src={PLACEHOLDER_IMAGE_URL}
              />
            }
          />
        </Row>
      )}
    </Modal>
  );
}
