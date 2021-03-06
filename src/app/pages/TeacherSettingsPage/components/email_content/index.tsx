import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Skeleton, Space, Button, Form, message } from 'antd';

import { FORM_ITEM_LAYOUT } from '../../constants';
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import FormInput from '../../../../components/features/teacher/form/form_input';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
} from '../../../../../utils/sweet_alert_2';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import {
  updateTeacherInfo,
  sendVerificationEmail,
} from '../../../../../features/teacher/teacherAPI';
import { getTeacherInfo } from '../../../../../features/guest/guestThunkAPI';
import { VERIFY_EMAIL_PAGE_PATH } from '../../../../../constants/routes';

type FormValues = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

export default function EmailContent() {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector(selectTeacherInfo);

  const teacherId = localStorage.studyFiles_user_id;

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: React.useMemo(() => {
      return {
        email: data?.email,
      };
    }, [data]),
  });

  const { handleSubmit, watch, reset } = methods;

  const watchEmail = watch('email');

  React.useEffect(() => {
    if (!isLoading && data) {
      reset({
        email: data!.email,
      });
    }
  }, [data, isLoading, reset]);

  const sendOTP = async () => {
    showLoadingSwal();

    const payload = {
      email: data!.email,
      id: teacherId,
    };

    const response = await sendVerificationEmail(payload);

    closeSwal();

    if (!response || response.status !== 200) {
      showErrorSwal(`Error: ${response}`);
    } else {
      message.info('An OTP have sent to your register mail');

      history.push(VERIFY_EMAIL_PAGE_PATH);
    }
  };

  const onSubmit = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const dataToSend = {
      ...values,
      name: data?.name,
    };

    const response = await updateTeacherInfo(teacherId, dataToSend);

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      localStorage.studyFiles_user_email = values.email;

      localStorage.studyFiles_user_isVerified = response.data.isEmailVerified;

      await dispatch(getTeacherInfo(data!.id));

      window.scrollTo(0, 0);

      message.success('Processing complete!');
    }

    setLoading(false);
  });

  const components = [
    {
      id: '1',
      title: 'Email',
      children: (
        <>
          <FormProvider {...methods}>
            <Form {...FORM_ITEM_LAYOUT} layout="vertical" onFinish={onSubmit}>
              <FormInput name="email" label="Email" />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!watchEmail || watchEmail === data?.email}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </FormProvider>
          <Alert
            message={
              data?.isEmailVerified
                ? 'Your email has been verified.'
                : 'Please verify your email!'
            }
            type={data?.isEmailVerified ? 'success' : 'warning'}
            showIcon
            action={
              !data?.isEmailVerified && (
                <Space>
                  <Button size="small" type="ghost" onClick={sendOTP}>
                    Send OTP
                  </Button>
                </Space>
              )
            }
          />
        </>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Email settings" />
      {isLoading ? (
        <Skeleton />
      ) : (
        <HeaderSiderContentLayout components={components} />
      )}
    </>
  );
}
