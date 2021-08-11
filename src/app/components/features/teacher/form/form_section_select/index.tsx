import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select, Typography } from 'antd';

import { Section } from '../../../../../../types';

const { Option } = Select;
const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  sections: Section[];
  checkDisabledForSection: boolean;
  changeHandler?: (value: string) => void;
};

export default function FormSectionSelect({
  name,
  label,
  sections,
  checkDisabledForSection,
  changeHandler,
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
          <Select
            {...field}
            style={{ width: '100%' }}
            onChange={(value: string) => {
              field.onChange(value);
              changeHandler && changeHandler(value);
            }}
          >
            {sections.map(section => (
              <Option
                key={section.id}
                value={section.id}
                disabled={
                  checkDisabledForSection
                    ? section.lectures.length < 2
                    : undefined
                }
              >
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
