import { useFormContext, Controller } from 'react-hook-form';
import { Form, Switch, Typography } from 'antd';

const { Text } = Typography;

export default function FormSwitch(props: {
  name: any;
  label: string;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  defaultChecked?: boolean;
}) {
  const {
    name,
    label,
    checkedChildren,
    unCheckedChildren,
    defaultChecked,
  } = props;

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
        defaultValue={defaultChecked}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value}
            checkedChildren={checkedChildren}
            unCheckedChildren={unCheckedChildren}
            defaultChecked={defaultChecked}
          />
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
