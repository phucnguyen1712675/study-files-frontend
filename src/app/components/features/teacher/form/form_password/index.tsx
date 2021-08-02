import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Typography } from 'antd';
const { Text } = Typography;

const { Password } = Input;

export default function FormPassword(props: { name: any; label: string }) {
  const { name, label } = props;

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

  // Maybe has hasFeedback prop
  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Password {...field} />}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
