import { useFormContext, Controller } from 'react-hook-form';
import { Form, Select, Typography } from 'antd';

import { CategoryDetails } from '../../../../../../types';

const { Option, OptGroup } = Select;
const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  defaultValue?: string;
  categories: CategoryDetails[];
};

export default function FormSubCategoryOptGroupSelect({
  name,
  label,
  defaultValue,
  categories,
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
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select {...field} defaultValue={defaultValue}>
            {categories.map(category => (
              <OptGroup key={category.id} label={category.name}>
                {category.subCategories.map(subCategory => (
                  <Option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
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
