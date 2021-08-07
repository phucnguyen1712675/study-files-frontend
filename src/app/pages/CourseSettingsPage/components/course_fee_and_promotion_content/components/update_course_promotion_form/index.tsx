import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal, Typography } from 'antd';
import moment from 'moment';

import { checkIfCourseHasPromotion } from '../../../../utils';
import { UpdateCoursePromotionFormValues } from '../../models/promotion';
import FormNumberInput from '../../../../../../components/features/teacher/form/form_number_input';
import FormRangePicker from '../../../../../../components/features/teacher/form/form_range_picker';
import {
  COURSE_FEE_MIN_VALUE,
  COURSE_ORIGINAL_FEE_MAX_VALUE,
} from '../../../../../../../constants/course';
import { useAppSelector } from '../../../../../../hooks';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const { Text } = Typography;

const schema = yup.object().shape({
  fee: yup.number(),
  promotionStart: yup.date(),
  promotionEnd: yup.date(),
});

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: UpdateCoursePromotionFormValues) => Promise<void>;
  onCancel: () => void;
}

export default function UpdateCoursePromotionForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const courseOriginalFee = data
    ? data?.originalFee
    : COURSE_ORIGINAL_FEE_MAX_VALUE;

  const methods = useForm<UpdateCoursePromotionFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, getValues, reset } = methods;

  const watchFee = watch('fee');

  const watchPromotionStart = watch('promotionStart');

  const watchPromotionEnd = watch('promotionEnd');

  const checkPromotion = React.useCallback(() => {
    if (!data) {
      return false;
    }
    if (!data.promotionStart || !data.promotionEnd) {
      return false;
    }
    return checkIfCourseHasPromotion(
      data.promotionStart,
      data.promotionEnd,
      data.originalFee,
      data.fee,
    );
  }, [data]);

  const disabledDate = current => {
    const hasPromotion = checkPromotion();

    if (hasPromotion) {
      return false;
    }
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const handleOk = async () => {
    await onCreate(getValues());

    reset();
  };

  return (
    <Modal
      visible={visible}
      title="Add promotion"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled: !watchFee && (!watchPromotionStart || !watchPromotionEnd),
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical">
          <FormNumberInput
            name="fee"
            label="Discount Fee"
            defaultValue={0}
            min={COURSE_FEE_MIN_VALUE}
            max={courseOriginalFee - 0.01}
            note={
              <Text type="warning">{`Value < ${courseOriginalFee} $`}</Text>
            }
          />
          <FormRangePicker
            label="Promotion date range"
            stateTimeName="promotionStart"
            endTimeName="promotionEnd"
            disabledDate={disabledDate}
          />
        </Form>
      </FormProvider>
    </Modal>
  );
}
