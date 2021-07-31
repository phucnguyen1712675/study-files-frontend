import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select, Typography } from 'antd';

import { Section } from '../../../../../../model/section';

const { Option } = Select;
const { Text } = Typography;

export default function FormSectionSelect(props: {
  name: any;
  label: string;
  defaultValue?: string;
  sections: Section[];
  changeHandler: (value: string) => void;
}) {
  const { name, label, defaultValue, sections, changeHandler } = props;

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
          <Select
            {...field}
            defaultValue={defaultValue}
            style={{ width: '100%' }}
            onChange={(value: string) => {
              field.onChange(value);
              changeHandler(value);
            }}
          >
            {sections.map(section => (
              <Option key={section.id} value={section.id}>
                {section.title}
              </Option>
            ))}
          </Select>
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
