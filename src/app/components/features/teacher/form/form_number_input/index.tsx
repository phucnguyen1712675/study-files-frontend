import { useFormContext, Controller } from 'react-hook-form';
import { Form, InputNumber, Typography, Space } from 'antd';

const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  defaultValue?: number;
  note?: React.ReactNode;
};

export default function FormNumberInput({
  name,
  label,
  min,
  max,
  disabled,
  defaultValue,
  note,
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
          {note}
          {isError && <Text type="danger">{errorMessage}</Text>}
        </Space>
      </Form.Item>
    </>
  );
}
