import React from 'react';
import { Modal, InputNumber, DatePicker, Space, Typography } from 'antd';
import moment from 'moment';

import { useAppSelector } from '../../../../../../hooks';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const { RangePicker } = DatePicker;
const { Text } = Typography;

interface Values {
  fee?: number;
  promotionStart?: moment.Moment;
  promotionEnd?: moment.Moment;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (promotion: Values) => void;
  onCancel: () => void;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

export default function AddPromotionForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const [fee, setFee] = React.useState<number | undefined>();
  const [promotionStart, setPromotionStart] = React.useState<
    moment.Moment | undefined
  >();
  const [promotionEnd, setPromotionEnd] = React.useState<
    moment.Moment | undefined
  >();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const courseDetails = useAppSelector(selectCourseDetails);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      //   setVisible(false);

      setConfirmLoading(false);
      onCreate({
        fee,
        promotionStart,
        promotionEnd,
      });
    }, 2000);
  };

  function onNumberChange(value) {
    console.log('changed', value);
    setFee(value);
  }

  function onDateChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    setPromotionStart(dates[0]);
    setPromotionEnd(dates[1]);
  }

  return (
    <Modal
      visible={visible}
      title="Add promotion"
      okText="Submit"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{ disabled: !promotionStart || !promotionEnd }}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <Space direction="vertical" size="middle">
        <Text>Fee</Text>
        <InputNumber
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value && value.replace(/\$\s?|(,*)/g, '')}
          onChange={onNumberChange}
        />
        <Text type="warning">
          Please enter number less than {courseDetails.data?.originalFee} $
        </Text>
        <Text>Date range of promotion</Text>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={onDateChange}
          disabledDate={disabledDate}
        />
      </Space>
    </Modal>
  );
}
