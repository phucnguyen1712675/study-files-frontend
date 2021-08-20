import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  Button,
  Space,
  Skeleton,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import TeacherAvatar from '../../../../components/features/teacher/teacher_avatar';
import EditPictureForm from '../../../../components/features/teacher/form/edit_picture_form';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormTextArea from '../../../../components/features/teacher/form/form_text_area';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import { EditPictureFormValues } from '../../../../../types';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
} from '../../../../../utils/sweet_alert_2';
import { selectTeacherInfo } from '../../../../../features/guest/guestSlice';
import { updateTeacherInfo } from '../../../../../features/teacher/teacherAPI';
import { getTeacherInfo } from '../../../../../features/guest/guestThunkAPI';

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
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector(selectTeacherInfo);

  const teacherId = localStorage.studyFiles_user_id;

  const [visible, setVisible] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

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

  const { handleSubmit, watch, reset } = methods;

  const watchName = watch('name');

  const watchShortDescription = watch('shortDescription');

  const watchDetailDescription = watch('detailDescription');

  React.useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data!.name,
        shortDescription: data!.shortDescription,
        detailDescription: data!.detailDescription,
      });
    }
  }, [data, isLoading, reset]);

  const onCreate = async (values: EditPictureFormValues) => {
    setVisible(false);

    showLoadingSwal();

    const dataToSend = {
      avatar: values.image,
    };

    const response = await updateTeacherInfo(teacherId, dataToSend);

    if (!response || response.status !== 200) {
      closeSwal();

      showErrorSwal(`Error: ${response}`);
    } else {
      await dispatch(getTeacherInfo(data!.id));

      window.scrollTo(0, 0);

      closeSwal();

      showSuccessSwal();
    }
  };

  const onClickBtnEdit = () => setVisible(true);

  const onCancel = () => setVisible(false);

  const onSubmit = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const payload = { ...values };

    // Delete undefined prop
    Object.keys(payload).forEach(key =>
      payload[key] === undefined ? delete payload[key] : {},
    );

    const response = await updateTeacherInfo(teacherId, payload);

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      localStorage.studyFiles_user_name = payload.name;

      await dispatch(getTeacherInfo(data!.id));

      window.scrollTo(0, 0);

      message.success('Processing complete!');
    }

    setLoading(false);
  });

  const checkDisabled = () => {
    if (!data) {
      return false;
    }

    if (
      typeof data.shortDescription === 'undefined' &&
      typeof data.detailDescription === 'undefined'
    ) {
      return (
        (!watchName || watchName === data?.name) &&
        !watchDetailDescription &&
        !watchShortDescription
      );
    }

    if (
      typeof data.shortDescription === 'undefined' ||
      typeof data.detailDescription === 'undefined'
    ) {
      if (typeof data.shortDescription === 'undefined') {
        return (
          (!watchName ||
            (watchName === data?.name &&
              watchDetailDescription === data.detailDescription)) &&
          !watchShortDescription
        );
      }
      return (
        (!watchName ||
          (watchName === data?.name &&
            watchShortDescription === data.shortDescription)) &&
        !watchDetailDescription
      );
    }

    return (
      !watchName ||
      (watchName === data?.name &&
        watchShortDescription === data.shortDescription &&
        watchDetailDescription === data.detailDescription)
    );
  };

  const components = [
    {
      id: '1',
      title: 'Public profile',
      children: (
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={checkDisabled()}
                  >
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
              <Button icon={<EditOutlined />} onClick={onClickBtnEdit}>
                Edit
              </Button>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <PageHelmet title="Your profile" />
      {isLoading ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        <>
          <HeaderSiderContentLayout components={components} />
          <EditPictureForm
            visible={visible}
            onCreate={onCreate}
            onCancel={onCancel}
            title="Change profile picture"
            label="Choose a picture"
          />
        </>
      )}
    </>
  );
}
