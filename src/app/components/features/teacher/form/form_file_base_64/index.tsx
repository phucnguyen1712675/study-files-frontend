import { useFormContext, Controller } from 'react-hook-form';
import { Form, Typography } from 'antd';
import FileBase from 'react-file-base64';

const { Text } = Typography;

export default function FormFileBase64(props: {
  name: any;
  label: string;
  fileKey?: any;
}) {
  const { name, label, fileKey } = props;

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

  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FileBase
            {...field}
            key={fileKey}
            multiple={false}
            onDone={({ base64 }) => setValue(name, base64)}
          />
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
