import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Skeleton, Space, Button, Form } from 'antd';

import FormInput from '../../../../components/features/teacher/form/form_input';
import { useAppSelector } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';

type FormValues = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export default function EmailContent() {
  const { data, isLoading } = useAppSelector(selectTeacherInfo);

  const defaultValues = {
    email: data?.email,
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  React.useEffect(() => {
    setValue('email', data?.email ?? '');
  }, [data, setValue]);

  const alertMessage = data?.isEmailVerified
    ? 'Your email has been verified.'
    : 'Please verify your email!';

  const alertType = data?.isEmailVerified ? 'success' : 'warning';

  const sendOTP = () => {};

  const onSubmit = handleSubmit((data: FormValues) => {
    console.log(data);
  });

  return (
    <>
      <PageHelmet title="Email settings" />
      {isLoading ? (
        <Skeleton />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'Email',
              contentComponent: (
                <>
                  <FormProvider {...methods}>
                    <Form
                      {...formItemLayout}
                      layout="vertical"
                      onFinish={onSubmit}
                    >
                      <FormInput name="email" label="Email" />
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </FormProvider>
                  <Alert
                    message={alertMessage}
                    type={alertType}
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
          ]}
        />
      )}
    </>
  );
}
