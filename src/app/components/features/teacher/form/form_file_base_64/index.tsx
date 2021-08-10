import { useFormContext, Controller } from 'react-hook-form';
import { Form, Typography, message } from 'antd';
import FileBase from 'react-file-base64';

const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  fileKey?: string;
  desiredFileType: 'image' | 'video';
};

const isDesiredFileType = (fileType: string, desiredFileType: string) =>
  !!fileType.match(`${desiredFileType}.*`);

export default function FormFileBase64({
  name,
  label,
  fileKey,
  desiredFileType,
}: Props) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  let isError = false;
  let errorMessage = '';
  if (errors && errors.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errors[name].message;
  }

  const onDone = ({ type, base64 }) => {
    const isMatchedType = isDesiredFileType(type, desiredFileType);

    if (isMatchedType) {
      setValue(name, base64);
    } else {
      setValue(name, '');
      message.warning(`Please select File with ${desiredFileType} type `);
    }
  };

  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FileBase {...field} key={fileKey} multiple={false} onDone={onDone} />
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
