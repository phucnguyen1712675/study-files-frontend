import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Space, Skeleton, Row, Col, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../hooks';
import EditPictureForm from '../../../../components/features/teacher/form/edit_picture_form';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormTextArea from '../../../../components/features/teacher/form/form_text_area';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import TeacherAvatar from '../../../../components/features/teacher/teacher_avatar';

const { Text } = Typography;

type FormValues = {
  name: string;
  shortDescription: string;
  detailDescription: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  shortDescription: yup.string(),
  detailDescription: yup.string(),
});

export default function ProfileContent() {
  const [visible, setVisible] = React.useState(false);

  const { data, isLoading } = useAppSelector(selectTeacherInfo);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: React.useMemo(() => {
      return {
        name: data?.name,
        shortDescription: data?.shortDescription,
        detailDescription: data?.detailDescription,
      };
    }, [data]),
  });

  const { handleSubmit, setValue } = methods;

  React.useEffect(() => {
    setValue('name', data?.name ?? '');
    setValue('shortDescription', data?.shortDescription ?? '');
    setValue('detailDescription', data?.detailDescription ?? '');
  }, [data, setValue]);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  const onSubmit = handleSubmit((data: FormValues) => {
    console.log(data);
  });

  return (
    <>
      <PageHelmet title="Your profile" />
      {isLoading ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'Public profile',
              contentComponent: (
                <Row>
                  <Col span={16} style={{ padding: '0px 20px' }}>
                    <FormProvider {...methods}>
                      <Form layout="vertical" onFinish={onSubmit}>
                        <FormInput name="name" label="Name" />
                        <FormTextArea
                          name="shortDescription"
                          label="Short description"
                          autoSize={false}
                        />
                        <FormTextArea
                          name="detailDescription"
                          label="Detail description"
                          autoSize={true}
                        />
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </FormProvider>
                  </Col>
                  <Col span={8} style={{ padding: '0px 20px' }}>
                    <Space
                      size="middle"
                      direction="vertical"
                      style={{ width: '100%' }}
                      align="center"
                    >
                      <Text>Profile picture</Text>
                      <TeacherAvatar
                        imageUrl={data?.avatar}
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 160,
                          xxl: 180,
                        }}
                      />
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                          setVisible(true);
                        }}
                      >
                        Edit
                      </Button>
                    </Space>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      )}
      <EditPictureForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
        title="Change profile picture"
        label="Choose a picture"
      />
    </>
  );
}