import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, message } from 'antd';

import { FORM_ITEM_LAYOUT } from '../../constants';
import FormPassword from '../../../../components/features/teacher/form/form_password';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { USER_PASSWORD_MIN_LENGTH } from '../../../../../constants/user';
import { updatePassword } from '../../../../../features/teacher/teacherAPI';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup.string().min(USER_PASSWORD_MIN_LENGTH).required(),
  newPassword: yup
    .string()
    .min(USER_PASSWORD_MIN_LENGTH)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one letter and one number',
    ),
  confirmNewPassword: yup
    .string()
    .min(USER_PASSWORD_MIN_LENGTH)
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export default function AccountSecurityContent() {
  const teacherId = localStorage.studyFiles_user_id;

  const [loading, setLoading] = React.useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, watch } = methods;

  const watchOldPassword = watch('oldPassword');

  const watchNewPassword = watch('newPassword');

  const watchConfirmNewPassword = watch('confirmNewPassword');

  const onSubmit = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const { confirmNewPassword, ...dataToSend } = values;

    const response = await updatePassword(teacherId, dataToSend);

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      message.success('Processing complete!');

      reset();
    }

    setLoading(false);
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
                <Form
                  {...FORM_ITEM_LAYOUT}
                  layout="vertical"
                  onFinish={onSubmit}
                >
                  <FormPassword name="oldPassword" label="Old password" />
                  <FormPassword name="newPassword" label="New password" />
                  <FormPassword
                    name="confirmNewPassword"
                    label="Confirm new password"
                  />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={
                        !watchOldPassword ||
                        !watchNewPassword ||
                        !watchConfirmNewPassword ||
                        watchOldPassword === watchNewPassword
                      }
                    >
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
