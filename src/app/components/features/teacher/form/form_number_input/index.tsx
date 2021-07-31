import { useFormContext, Controller } from 'react-hook-form';
import { Form, InputNumber, Typography, Space } from 'antd';

const { Text } = Typography;

export default function FormNumberInput(props: {
  name: any;
  label: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  defaultValue?: number;
  noteChild?: JSX.Element;
}) {
  const { name, label, min, max, disabled, defaultValue, noteChild } = props;

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
    <>
      <Form.Item label={label}>
        <Space direction="vertical">
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
              <InputNumber
                {...field}
                defaultValue={defaultValue}
                min={min}
                max={max}
                disabled={disabled ?? false}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value && value.replace(/\$\s?|(,*)/g, '')}
              />
            )}
          />
          {noteChild}
          {isError && <Text type="danger">{errorMessage}</Text>}
        </Space>
      </Form.Item>
    </>
  );
}
