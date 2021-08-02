import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'antd';

import { updatePassword } from 'features/teacher/teacherAPI';

import FormPassword from '../../../../components/features/teacher/form/form_password';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup.string().min(9).required(),
  newPassword: yup.string().min(9).required(),
  confirmNewPassword: yup
    .string()
    .min(9)
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
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

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export default function AccountSecurityContent() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data: FormValues) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert('The passwords do not match');
      reset({ confirmNewPassword: '' });
    } else {
      const dataToSend = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      const res = await updatePassword(dataToSend);
      if (res.status === 200) {
        reset({ ...defaultValues });
        alert('Updated !');
      } else if (res.response) {
        alert(res.response.data.message);
      }
    }
  });

  return (
    <>
      <PageHelmet title="Account security" />
      <HeaderSiderContentLayout
        components={[
          {
            title: 'Change password',
            contentComponent: (
              <FormProvider {...methods}>
                <Form {...formItemLayout} layout="vertical" onFinish={onSubmit}>
                  <FormPassword name="oldPassword" label="Old password" />
                  <FormPassword name="newPassword" label="New password" />
                  <FormPassword
                    name="confirmNewPassword"
                    label="Confirm new password"
                  />
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </FormProvider>
            ),
          },
        ]}
      />
    </>
  );
}
