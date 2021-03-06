import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  autoSize: boolean;
  placeholder?: string;
};

export default function FormTextArea({
  name,
  label,
  autoSize,
  placeholder,
}: Props) {
  const {
    control,
    formState: { errors },
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
          <TextArea {...field} autoSize={autoSize} placeholder={placeholder} />
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
