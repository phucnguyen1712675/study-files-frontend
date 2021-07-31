import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select } from 'antd';

import { Section } from '../../../../../../../model/section';

const { Option, OptGroup } = Select;

export default function FormLectureOptGroupSelect(props: {
  name: any;
  label: string;
  //   defaultValue: string;
  sections: Section[];
}) {
  //   const { name, label, defaultValue, sections } = props;
  const { name, label, sections } = props;

  const { control } = useFormContext();

  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        // defaultValue={defaultValue}
        render={({ field }) => (
          //   <Select {...field} defaultValue={defaultValue}>
          <Select {...field}>
            {sections.map(section => (
              <OptGroup key={section.id} label={section.title}>
                {section.lectures.map(lecture => (
                  <Option
                    key={lecture.id}
                    value={lecture.id}
                    disabled={!!lecture.videoUrl}
                  >
                    {lecture.title}
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
}
