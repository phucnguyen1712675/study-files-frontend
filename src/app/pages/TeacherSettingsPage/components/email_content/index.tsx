import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Skeleton, Space, Button, Form } from 'antd';

import FormInput from '../../../../components/features/teacher/form/form_input';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import { updateTeacherInfo } from '../../../../../features/teacher/teacherAPI';
import { getTeacherInfo } from '../../../../../features/guest/guestThunkAPI';

import { axiosAuthInstance } from 'api/auth';

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
  const history = useHistory();
  const dispatch = useAppDispatch();

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

  const sendOTP = async () => {
    try {
      const resSendEmail = await axiosAuthInstance.post(
        '/send-verification-email',
        {
          email: data?.email,
          id: localStorage.studyFiles_user_id,
        },
      );
      if (resSendEmail.status === 200) {
        alert('an Otp have sent to your register mail');
        history.push('/verifyEmail');
        window.location.reload();
      } else {
        alert('something wrong ?');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert(err.request);
      } else {
        alert(err.message);
      }
    }
  };

  const onSubmit = handleSubmit(async (values: FormValues) => {
    if (values.email !== data?.email) {
      const dataToSend = {
        email: values.email,
        name: data?.name,
      };
      const res = await updateTeacherInfo(dataToSend);
      if (res.status === 200) {
        localStorage.studyFiles_user_email = values.email;
        localStorage.studyFiles_user_isVerified = res.data.isEmailVerified;
        dispatch(getTeacherInfo(data?.id ?? ''));
        alert('Update successed');
      } else {
        alert(res.response.data.message);
      }
    }
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
              children: (
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
