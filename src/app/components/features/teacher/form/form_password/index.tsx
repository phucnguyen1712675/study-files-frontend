import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Typography } from 'antd';

const { Password } = Input;
const { Text } = Typography;

type Props = { name: any; label: string };

export default function FormPassword({ name, label }: Props) {
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
        render={({ field }) => <Password {...field} />}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
