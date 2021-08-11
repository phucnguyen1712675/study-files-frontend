import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select, Typography } from 'antd';

import { Lecture } from '../../../../../../../../../types';

const { Option } = Select;
const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  lectures: Lecture[];
};

export default function FormLectureSelect({ name, label, lectures }: Props) {
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
          <Select {...field} style={{ width: '100%' }}>
            {lectures.map(lecture => (
              <Option key={lecture.id} value={lecture.id}>
                {lecture.title}
              </Option>
            ))}
          </Select>
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
