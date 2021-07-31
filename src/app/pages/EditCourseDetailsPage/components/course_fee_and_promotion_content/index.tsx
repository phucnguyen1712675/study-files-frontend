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
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import AddPromotionForm from './components/add_promotion_form';
import { useAppSelector } from '../../../../hooks';
import FormNumberInput from '../../../../components/features/teacher/form/form_number_input';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  COURSE_ORIGINAL_FEE_MIN_VALUE,
  COURSE_ORIGINAL_FEE_MAX_VALUE,
} from '../../../../../constants/course';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';

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
  const courseDetails = useAppSelector(selectCourseDetails);

  const [addPromotionFormVisible, setAddPromotionFormVisible] = React.useState(
    false,
  );
  const [
    endPromotionPopconfirmVisible,
    setEndPromotionPopconfirmVisible,
  ] = React.useState(false);
  const [hasPromotion, setHasPromotion] = React.useState<boolean>(
    // If have start date
    (courseDetails.data?.promotionStart &&
      // and end date
      courseDetails.data?.promotionEnd &&
      // and (start < now < end
      ((courseDetails.data?.promotionStart < new Date() &&
        courseDetails.data?.promotionEnd > new Date()) ||
        // or now > start)
        courseDetails.data?.promotionStart > new Date())) ??
      false,
  );
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: React.useMemo(() => {
      return {
        originalFee: courseDetails.data?.originalFee,
      };
    }, [courseDetails]),
  });

  const {
    handleSubmit,
    setValue,
    // watch,
    // formState: { errors },
  } = methods;

  React.useEffect(() => {
    setValue('originalFee', courseDetails.data?.originalFee ?? 0);
  }, [courseDetails.isLoading, courseDetails.data, setValue]);

  const onSubmit = handleSubmit((data: FormValues) => {
    console.log(data);
  });

  const onCreatePromotion = (values: any) => {
    console.log('Received values of form: ', values);
    setAddPromotionFormVisible(false);
    setHasPromotion(true);
  };

  const showPopconfirm = () => {
    setEndPromotionPopconfirmVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setEndPromotionPopconfirmVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setEndPromotionPopconfirmVisible(false);
  };

  // const test: Date | undefined = new Date();

  return (
    <>
      <PageHelmet title="Fee & Promotion" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 8 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'Fee',
              contentComponent: (
                <FormProvider {...methods}>
                  <Form layout="vertical" onFinish={onSubmit}>
                    <FormNumberInput name="originalFee" label="Fee ($)" />
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </FormProvider>
              ),
            },
            {
              title: 'Promotion',
              contentComponent: (
                <>
                  {!hasPromotion ? (
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setAddPromotionFormVisible(true);
                      }}
                    >
                      Add promotion
                    </Button>
                  ) : (
                    <Space direction="vertical" size="middle">
                      <Text>Discount Fee ($)</Text>
                      <InputNumber
                        value={courseDetails.data?.fee}
                        formatter={value =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        disabled
                      />
                      <Text>Promotion Date Range</Text>
                      <RangePicker
                        defaultValue={[
                          moment(
                            courseDetails.data?.promotionStart
                              ?.toISOString()
                              .slice(0, 10)
                              .replace(/-/g, ''),
                            dateFormat,
                          ),
                          moment(
                            courseDetails.data?.promotionEnd
                              ?.toISOString()
                              .slice(0, 10)
                              .replace(/-/g, ''),
                            dateFormat,
                          ),
                        ]}
                        disabled
                      />
                      <Popconfirm
                        title="Are you sure?"
                        visible={endPromotionPopconfirmVisible}
                        onConfirm={handleOk}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                      >
                        <Button danger onClick={showPopconfirm}>
                          End promotion
                        </Button>
                      </Popconfirm>
                    </Space>
                  )}
                </>
              ),
            },
          ]}
        />
      )}
      <AddPromotionForm
        visible={addPromotionFormVisible}
        onCreate={onCreatePromotion}
        onCancel={() => {
          setAddPromotionFormVisible(false);
        }}
      />
    </>
  );
}
