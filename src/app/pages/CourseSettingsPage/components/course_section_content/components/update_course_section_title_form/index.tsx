import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal } from 'antd';

import { UpdateCourseSectionTitleFormValues } from '../../types';
import { useAppSelector } from '../../../../../../hooks';
import FormSectionSelect from '../../../../../../components/features/teacher/form/form_section_select';
import FormInput from '../../../../../../components/features/teacher/form/form_input';
import {
  SECTION_TITLE_MIN_LENGTH,
  SECTION_TITLE_MAX_LENGTH,
} from '../../../../../../../constants/section';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const schema = yup.object().shape({
  sectionId: yup.string().required('Section is Required'),
  title: yup
    .string()
    .min(SECTION_TITLE_MIN_LENGTH)
    .max(SECTION_TITLE_MAX_LENGTH)
    .required('Title is Required'),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: UpdateCourseSectionTitleFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function UpdateCourseSectionTitleForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const sections = data?.sections ?? [];

  const [currentSectionTitle, setCurrentSectionTitle] = React.useState<string>(
    '',
  );

  const methods = useForm<UpdateCourseSectionTitleFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, getValues, setValue, reset } = methods;

  const watchSectionId = watch('sectionId');

  const watchTitle = watch('title');

  const sectionChangeHandler = (sectionId: string) => {
    const currentTitle =
      sections.find(section => section.id === sectionId)?.title ?? '';

    setValue('title', currentTitle);

    setCurrentSectionTitle(currentTitle);
  };

  const handleOk = async () => {
    await onCreate(getValues());

    reset();

    setCurrentSectionTitle('');
  };

  return (
    <Modal
      visible={visible}
      title="Update section's title"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled:
          !watchSectionId || !watchTitle || currentSectionTitle === watchTitle,
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical">
          <FormSectionSelect
            name="sectionId"
            label="Choose a Section"
            sections={sections}
            checkDisabledForSection={false}
            changeHandler={sectionChangeHandler}
          />
          {watchSectionId && <FormInput name="title" label="Title to update" />}
        </Form>
      </FormProvider>
    </Modal>
  );
}
