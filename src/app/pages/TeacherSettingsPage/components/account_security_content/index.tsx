import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'antd';

import FormPassword from '../../../../components/features/teacher/form/form_password';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup.string().min(8).required(),
  newPassword: yup.string().min(8).required(),
  confirmNewPassword: yup.string().min(8).required(),
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

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((values: FormValues) => {
    console.log(values);
  });

  return (
    <>
      <PageHelmet title="Account security" />
      <HeaderSiderContentLayout
        components={[
          {
            title: 'Change password',
            children: (
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
