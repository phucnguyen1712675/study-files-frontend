import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal } from 'antd';

import { UpdateSectionOrdinalNumberFormValues } from '../../models/update_section_ordinal_number_form_values';
import { useAppSelector } from '../../../../../../hooks';
import FormSectionSelect from '../../../../../../components/features/teacher/form/form_section_select';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const schema = yup.object().shape({
  firstSectionId: yup.string().required('First Section is Required'),
  secondSectionId: yup.string().required('Second Section is Required'),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: UpdateSectionOrdinalNumberFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function UpdateSectionOrdinalNumberForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const sections = data?.sections ?? [];

  const methods = useForm<UpdateSectionOrdinalNumberFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, getValues, setValue, reset } = methods;

  const watchFirstSectionId = watch('firstSectionId');

  const watchSecondSectionId = watch('secondSectionId');

  const firstSectionChangeHandler = (sectionId: string) => {
    if (watchSecondSectionId && watchSecondSectionId === sectionId) {
      setValue('secondSectionId', '');
    }
  };

  const handleOk = async () => {
    await onCreate(getValues());

    reset();
  };

  return (
    <Modal
      visible={visible}
      title="Update section's ordinal number"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled: !watchFirstSectionId || !watchSecondSectionId,
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical">
          <FormSectionSelect
            name="firstSectionId"
            label="Choose a Section"
            sections={sections}
            checkDisabledForSection={false}
            changeHandler={firstSectionChangeHandler}
          />
          {watchFirstSectionId && (
            <FormSectionSelect
              name="secondSectionId"
              label="Choose a Section to swap Ordinal number"
              sections={sections.filter(
                section => section.id !== watchFirstSectionId,
              )}
              checkDisabledForSection={false}
            />
          )}
        </Form>
      </FormProvider>
    </Modal>
  );
}
