import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select, Typography } from 'antd';

import { Section } from '../../../../../types';

const { Option, OptGroup } = Select;
const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  sections: Section[];
  checkDisabledForLecture: boolean;
  changeHandler?: (value: string) => void;
};

export default function FormLectureOptGroupSelect({
  name,
  label,
  sections,
  checkDisabledForLecture,
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
            onChange={(value: string) => {
              field.onChange(value);
              changeHandler && changeHandler(value);
            }}
          >
            {sections.map(section => (
              <OptGroup key={section.id} label={section.title}>
                {section.lectures.map(lecture => (
                  <Option
                    key={lecture.id}
                    value={lecture.id}
                    disabled={
                      checkDisabledForLecture ? !!lecture.videoUrl : undefined
                    }
                  >
                    {lecture.title}
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
