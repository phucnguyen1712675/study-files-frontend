import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  Skeleton,
  Button,
  DatePicker,
  Typography,
  Space,
  Popconfirm,
  InputNumber,
  Alert,
  message,
} from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { updatedDiff } from 'deep-object-diff';

import { UpdateCoursePromotionFormValues } from './types';
import UpdateCoursePromotionForm from './components/update_course_promotion_form';
import { checkIfCourseHasPromotion } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import FormNumberInput from '../../../../components/features/teacher/form/form_number_input';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  COURSE_ORIGINAL_FEE_MIN_VALUE,
  COURSE_ORIGINAL_FEE_MAX_VALUE,
} from '../../../../../constants/course';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import { updateCourse } from '../../../../../features/teacher/teacherAPI';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
  showWarningSwal,
} from '../../../../../utils/sweet_alert_2';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const dateFormat = 'YYYY-MM-DD';

type FormValues = {
  originalFee: number;
  hasPromotion: boolean;
};

const schema = yup.object().shape({
  originalFee: yup
    .number()
    .min(COURSE_ORIGINAL_FEE_MIN_VALUE)
    .max(COURSE_ORIGINAL_FEE_MAX_VALUE)
    .required('Original Fee is Required'),
});

export default function CourseFeeAndPromotionContent() {
  const dispatch = useAppDispatch();

  const courseDetails = useAppSelector(selectCourseDetails);

  const { data, isLoading } = courseDetails;

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

  const [
    updateCoursePromotionFormVisible,
    setUpdateCoursePromotionFormVisible,
  ] = React.useState<boolean>(false);

  const [
    endPromotionPopconfirmVisible,
    setEndPromotionPopconfirmVisible,
  ] = React.useState<boolean>(false);

  const [hasPromotion, setHasPromotion] = React.useState<boolean>(
    checkPromotion(),
  );

  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);

  const [btnSubmitLoading, setBtnSubmitLoading] = React.useState<boolean>(
    false,
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: React.useMemo(() => {
      return {
        originalFee: data?.originalFee,
      };
    }, [data]),
  });

  const { handleSubmit, getValues, watch, reset } = methods;

  const watchOriginalFee = watch('originalFee');

  React.useEffect(() => {
    if (!isLoading && data) {
      reset({
        originalFee: data!.originalFee,
      });
      setHasPromotion(checkPromotion());
    }
  }, [data, isLoading, reset, checkPromotion]);

  const onSubmit = handleSubmit(async (values: FormValues) => {
    const courseData = courseDetails.data!;

    const difference = updatedDiff(courseData, values);

    if (
      !difference ||
      Object.keys(difference).length !== 0 ||
      difference.constructor !== Object
    ) {
      setBtnSubmitLoading(true);

      const { id } = data!;

      const payload = {
        ...values,
        fee: getValues('originalFee'),
      };

      const response = await updateCourse(id, payload);

      if (!response || response.status !== 200) {
        message.error(`Error: ${response}`);
      } else {
        message.success('Processing complete!');

        dispatch(getCourseDetails(id));
      }

      setBtnSubmitLoading(false);
    } else {
      message.success('Processing complete!');
    }
  });

  const onCreatePromotion = async (values: UpdateCoursePromotionFormValues) => {
    setUpdateCoursePromotionFormVisible(false);

    const { promotionEnd } = values;

    if (hasPromotion && promotionEnd && new Date(promotionEnd) <= new Date()) {
      showWarningSwal('Choose "End promotion" instead');
    } else {
      showLoadingSwal();

      const { id } = data!;

      const response = await updateCourse(id, values);

      closeSwal();

      if (!response || response.status !== 200) {
        showErrorSwal(`Error: ${response}`);
      } else {
        showSuccessSwal();

        await dispatch(getCourseDetails(id));

        !hasPromotion && setHasPromotion(true);
      }
    }
  };

  const showPopconfirm = () => setEndPromotionPopconfirmVisible(true);

  const handleCancel = () => setEndPromotionPopconfirmVisible(false);

  const btnEndPromotionHandleOk = async () => {
    setConfirmLoading(true);

    const { id, originalFee } = data!;

    const payload = {
      fee: originalFee,
    };

    const response = await updateCourse(id, payload);

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      message.success('Processing complete!');

      dispatch(getCourseDetails(id));

      setHasPromotion(false);
    }

    setEndPromotionPopconfirmVisible(false);

    setConfirmLoading(false);
  };

  const toggleUpdatePromotionFormButton = (
    <Button
      icon={!hasPromotion ? <PlusOutlined /> : <EditOutlined />}
      onClick={() => setUpdateCoursePromotionFormVisible(true)}
    >
      {!hasPromotion ? 'Add promotion' : 'Edit promotion'}
    </Button>
  );

  const components = [
    {
      id: '1',
      title: 'Fee',
      children: (
        <>
          <FormProvider {...methods}>
            <Form layout="vertical" onFinish={onSubmit}>
              <FormNumberInput
                name="originalFee"
                label="Fee ($)"
                disabled={hasPromotion}
                min={COURSE_ORIGINAL_FEE_MIN_VALUE}
                max={COURSE_ORIGINAL_FEE_MAX_VALUE}
                note={
                  !hasPromotion ? (
                    <Text type="warning">{`Value <= ${COURSE_ORIGINAL_FEE_MAX_VALUE} $`}</Text>
                  ) : undefined
                }
              />
              {!hasPromotion && (
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={btnSubmitLoading}
                    disabled={
                      !watchOriginalFee ||
                      watchOriginalFee === data?.originalFee
                    }
                  >
                    Submit
                  </Button>
                </Form.Item>
              )}
            </Form>
          </FormProvider>
          {hasPromotion && (
            <Alert
              message="You cannot edit the fee while the course is on promotion"
              type="info"
              showIcon
            />
          )}
        </>
      ),
    },
    {
      id: '2',
      title: 'Promotion',
      children: (
        <>
          {!hasPromotion ? (
            toggleUpdatePromotionFormButton
          ) : isLoading && !data ? (
            <Skeleton />
          ) : (
            <Space direction="vertical" size="middle">
              <Text>Discount Fee ($)</Text>
              <InputNumber
                value={data?.fee}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                disabled
              />
              <Text>Promotion Date Range</Text>
              <RangePicker
                key={`${
                  data?.fee
                }${data?.promotionStart!}${data?.promotionEnd!}`}
                defaultValue={[
                  moment(
                    new Date(data?.promotionStart!)
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ''),
                    dateFormat,
                  ),
                  moment(
                    new Date(data?.promotionEnd!)
                      ?.toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ''),
                    dateFormat,
                  ),
                ]}
                disabled
              />
              <Alert
                message={
                  new Date(data?.promotionStart!) < new Date() &&
                  new Date(data?.promotionEnd!) > new Date()
                    ? 'Promotion is going on'
                    : 'Promotion is coming soon'
                }
                type="info"
                showIcon
              />
              <Space size="middle">
                {toggleUpdatePromotionFormButton}
                <Popconfirm
                  title="Are you sure?"
                  visible={endPromotionPopconfirmVisible}
                  onConfirm={btnEndPromotionHandleOk}
                  okButtonProps={{ loading: confirmLoading }}
                  onCancel={handleCancel}
                >
                  <Button
                    icon={<CloseOutlined />}
                    danger
                    onClick={showPopconfirm}
                  >
                    End promotion
                  </Button>
                </Popconfirm>
              </Space>
            </Space>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Fee & Promotion" />
      {isLoading && !data ? (
        <Skeleton active avatar paragraph={{ rows: 8 }} />
      ) : (
        <>
          <HeaderSiderContentLayout components={components} />
          <UpdateCoursePromotionForm
            // key={`${data?.fee}${data?.promotionStart!}${data?.promotionEnd!}`}
            visible={updateCoursePromotionFormVisible}
            onCreate={onCreatePromotion}
            onCancel={() => {
              setUpdateCoursePromotionFormVisible(false);
            }}
          />
        </>
      )}
    </>
  );
}
