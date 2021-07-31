import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

const { Password } = Input;

export default function FormPassword(props: { name: any; label: string }) {
  const { name, label } = props;

  const { control } = useFormContext();

  // Maybe has hasFeedback prop
  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Password {...field} />}
      />
    </Form.Item>
  );
}
