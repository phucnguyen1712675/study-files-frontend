import { useFormContext } from 'react-hook-form';
import { Form, Typography, DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Text } = Typography;

type Props = {
  stateTimeName: any;
  endTimeName: any;
  label: string;
  disabledDate: (currentDate: any) => boolean;
};

export default function FormRangePicker({
  stateTimeName,
  endTimeName,
  label,
  disabledDate,
}: Props) {
  const onDateChange = dates => {
    if (dates && dates.length === 2) {
      setValue(stateTimeName, dates[0].format());
      setValue(endTimeName, dates[1].format());
    }
  };

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  let startTimeIsError = false;
  let endTimeIsError = false;

  let startTimeErrorMessage = '';
  let endTimeErrorMessage = '';

  if (errors && errors.hasOwnProperty(stateTimeName)) {
    startTimeIsError = true;
    startTimeErrorMessage = errors[stateTimeName].message;
  }
  if (errors && errors.hasOwnProperty(endTimeName)) {
    endTimeIsError = true;
    endTimeErrorMessage = errors[endTimeName].message;
  }

  return (
    <Form.Item label={label}>
      <Space direction="vertical">
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={onDateChange}
          disabledDate={disabledDate}
        />
        {startTimeIsError && <Text type="danger">{startTimeErrorMessage}</Text>}
        {endTimeIsError && <Text type="danger">{endTimeErrorMessage}</Text>}
      </Space>
    </Form.Item>
  );
}
