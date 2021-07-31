import { useFormContext, Controller } from 'react-hook-form';
import { Form, Checkbox, Typography } from 'antd';

const { Text } = Typography;

export default function FormCheckbox(props: {
  name: any;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}) {
  const { name, label, disabled, defaultChecked } = props;

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
    <Form.Item>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultChecked}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            defaultChecked={defaultChecked}
            disabled={disabled ?? false}
          >
            {label}
          </Checkbox>
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
