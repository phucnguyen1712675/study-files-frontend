import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  Skeleton,
  Button,
  Divider,
  List,
  Typography,
  message,
  Alert,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import UpdateCourseSectionTitleForm from './components/update_course_section_title_form';
import UpdateSectionOrdinalNumberForm from './components/update_section_ordinal_number_form';
import { UpdateCourseSectionTitleFormValues } from './models/update_course_section_title_form_values';
import { UpdateSectionOrdinalNumberFormValues } from './models/update_section_ordinal_number_form_values';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import FormInput from '../../../../components/features/teacher/form/form_input';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  SECTION_TITLE_MIN_LENGTH,
  SECTION_TITLE_MAX_LENGTH,
} from '../../../../../constants/section';
import {
  showLoadingSwal,
  closeSwal,
  showErrorSwal,
  showSuccessSwal,
} from '../../../../../utils/sweet_alert_2';
import { selectCourseDetails } from '../../../../../features/teacher/teacherSlice';
import { getCourseDetails } from '../../../../../features/teacher/teacherThunkAPI';
import {
  addSection,
  updateSection,
  swapSectionOrdinalNumber,
} from '../../../../../features/teacher/teacherAPI';

const { Text } = Typography;

type FormValues = {
  title: string;
};

const schema = yup.object().shape({
  title: yup
    .string()
    .min(SECTION_TITLE_MIN_LENGTH)
    .max(SECTION_TITLE_MAX_LENGTH)
    .required('Title is Required'),
});

export default function CourseSectionContent() {
  const dispatch = useAppDispatch();

  const courseDetails = useAppSelector(selectCourseDetails);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [
    updateSectionTitleFormVisible,
    setUpdateSectionTitleFormVisible,
  ] = React.useState<boolean>(false);

  const [
    updateSectionOrdinalNumberFormVisible,
    setUpdateSectionOrdinalNumberFormVisible,
  ] = React.useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onFinish = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const { id } = courseDetails.data!;

    const payload = {
      ...values,
      courseId: id,
    };

    const response = await addSection(payload);

    if (!response || response.status !== 201) {
      message.error(`Error: ${response}`);
    } else {
      message.success('Processing complete!');

      dispatch(getCourseDetails(id));

      reset();
    }

    setLoading(false);
  });

  const onCreateUpdateCourseSectionTitleForm = async (
    values: UpdateCourseSectionTitleFormValues,
  ) => {
    setUpdateSectionTitleFormVisible(false);

    showLoadingSwal();

    const response = await updateSection(values);

    closeSwal();

    if (!response || response.status !== 200) {
      showErrorSwal(`Error: ${response}`);
    } else {
      showSuccessSwal();

      const { id } = courseDetails.data!;

      dispatch(getCourseDetails(id));
    }
  };

  const onCreateUpdateSectionOrdinalNumberForm = async (
    values: UpdateSectionOrdinalNumberFormValues,
  ) => {
    setUpdateSectionOrdinalNumberFormVisible(false);

    showLoadingSwal();

    const response = await swapSectionOrdinalNumber(values);

    closeSwal();

    if (!response || response.status !== 200) {
      message.error(`Error: ${response}`);
    } else {
      showSuccessSwal();

      const { id } = courseDetails.data!;

      dispatch(getCourseDetails(id));
    }
  };

  const onClickBtnUpdateSectionTitle = () => {
    setUpdateSectionTitleFormVisible(true);
  };

  const onClickBtnUpdateSectionOrdinalNumber = () => {
    setUpdateSectionOrdinalNumberFormVisible(true);
  };

  const onCancelUpdateSectionTitleVisible = () => {
    setUpdateSectionTitleFormVisible(false);
  };

  const onCancelUpdateSectionOrdinalNumberVisible = () => {
    setUpdateSectionOrdinalNumberFormVisible(false);
  };

  const getSectionsToShow = () => {
    if (!courseDetails.data?.sections) {
      return [];
    }
    return courseDetails.data?.sections.map(section => section.title);
  };

  return (
    <>
      <PageHelmet title="Section" />
      {courseDetails.isLoading && !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 16 }} />
      ) : !courseDetails.data?.status ? (
        <>
          <HeaderSiderContentLayout
            components={[
              {
                title: "Update section's title",
                children: (
                  <>
                    {courseDetails.data?.sections &&
                    courseDetails.data?.sections.length > 0 ? (
                      <Button
                        icon={<EditOutlined />}
                        onClick={onClickBtnUpdateSectionTitle}
                      >
                        Click to update
                      </Button>
                    ) : (
                      <Alert
                        message="No section to update!"
                        type="info"
                        showIcon
                      />
                    )}
                  </>
                ),
              },
              {
                title: "Update section's ordinal number",
                children: (
                  <>
                    {courseDetails.data?.sections &&
                    courseDetails.data?.sections.length > 1 ? (
                      <Button
                        icon={<EditOutlined />}
                        onClick={onClickBtnUpdateSectionOrdinalNumber}
                      >
                        Click to update
                      </Button>
                    ) : (
                      <Alert
                        message="Not enough section to swap ordinal number!"
                        type="info"
                        showIcon
                      />
                    )}
                  </>
                ),
              },
              {
                title: 'New',
                children: (
                  <>
                    <FormProvider {...methods}>
                      <Form layout="vertical" onFinish={onFinish}>
                        <FormInput
                          name="title"
                          label={`Title for Section ${
                            courseDetails.data?.sections
                              ? courseDetails.data?.sections.length + 1
                              : 0
                          }`}
                          placeholder="Enter title"
                        />
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </FormProvider>
                    {courseDetails.data?.sections &&
                      courseDetails.data?.sections.length > 0 && (
                        <>
                          <Divider orientation="left">Course content</Divider>
                          <Text>
                            {courseDetails.data?.sections.length} sections
                          </Text>
                          <List
                            size="small"
                            bordered
                            dataSource={getSectionsToShow()}
                            renderItem={item => <List.Item>{item}</List.Item>}
                          />
                        </>
                      )}
                  </>
                ),
              },
            ]}
          />
          <UpdateCourseSectionTitleForm
            visible={updateSectionTitleFormVisible}
            onCreate={onCreateUpdateCourseSectionTitleForm}
            onCancel={onCancelUpdateSectionTitleVisible}
          />
          <UpdateSectionOrdinalNumberForm
            visible={updateSectionOrdinalNumberFormVisible}
            onCreate={onCreateUpdateSectionOrdinalNumberForm}
            onCancel={onCancelUpdateSectionOrdinalNumberVisible}
          />
        </>
      ) : (
        <Alert
          message="This is a completed course"
          description="Once the course is completed, section cannot be added or updated."
          type="info"
          showIcon
        />
      )}
    </>
  );
}
