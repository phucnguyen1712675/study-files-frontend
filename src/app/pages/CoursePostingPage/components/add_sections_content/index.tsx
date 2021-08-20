import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, message, Alert, Divider, List, Typography } from 'antd';

import CustomContent from '../custom_content';
import { useAppSelector } from '../../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import FormInput from '../../../../components/features/teacher/form/form_input';
import {
  SECTION_TITLE_MIN_LENGTH,
  SECTION_TITLE_MAX_LENGTH,
} from '../../../../../constants/section';
import { selectNewCourseId } from '../../../../../features/teacher/teacherSlice';
import { addSection } from '../../../../../features/teacher/teacherAPI';

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

export default function AddSectionsContent() {
  const newCourseId = useAppSelector(selectNewCourseId);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [shouldShowNextButton, setShouldShowNextButton] = React.useState<
    boolean
  >(false);

  const [ordinalNumber, setOrdinalNumber] = React.useState<number>(0);

  const [addedSectionTitles, setAddedSectionTitles] = React.useState<string[]>(
    [],
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onFinish = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const payload = {
      ...values,
      courseId: newCourseId,
    };

    const response = await addSection(payload);

    if (!response || response.status !== 201) {
      message.error(`Error: ${response}`);
    } else {
      message.success('Processing complete!');

      setAddedSectionTitles(arr => [...arr, values.title]);

      setOrdinalNumber(ordinalNumber + 1);

      reset();
    }

    setLoading(false);
  });

  const onDone = () => setShouldShowNextButton(true);

  return (
    <>
      <PageHelmet title="Sections" />
      <CustomContent
        step={1}
        shouldShowNextButton={shouldShowNextButton}
        children={
          <>
            {addedSectionTitles.length !== 0 && (
              <Alert
                message="Guide"
                showIcon
                description="Press the DONE Button when you have added all the sections"
                type="info"
                action={
                  <Button size="small" type="primary" onClick={onDone}>
                    DONE
                  </Button>
                }
              />
            )}
            <FormProvider {...methods}>
              <Form layout="vertical" onFinish={onFinish}>
                <FormInput
                  name="title"
                  label={`Title for Section ${ordinalNumber + 1}`}
                  placeholder="Enter title"
                />
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </FormProvider>
            {addedSectionTitles.length !== 0 && (
              <>
                <Divider orientation="left">Course content</Divider>
                <Text>{addedSectionTitles.length} sections</Text>
                <List
                  size="small"
                  bordered
                  dataSource={addedSectionTitles}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </>
            )}
          </>
        }
      />
    </>
  );
}
