import { useFormContext, Controller } from 'react-hook-form';
import { Form, Checkbox, Typography } from 'antd';

const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
};

export default function FormCheckbox({
  name,
  label,
  disabled,
  defaultChecked,
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
