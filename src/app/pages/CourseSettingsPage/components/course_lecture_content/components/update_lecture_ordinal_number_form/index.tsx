import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal } from 'antd';

import FormLectureSelect from './components/form_lecture_select';
import { UpdateLectureOrdinalNumberFormValues } from '../../models/update_lecture_ordinal_number_form_values';
import { useAppSelector } from '../../../../../../hooks';
import FormSectionSelect from '../../../../../../components/features/teacher/form/form_section_select';
import { Lecture } from '../../../../../../../model/lecture';
import { selectCourseDetails } from '../../../../../../../features/teacher/teacherSlice';

const schema = yup.object().shape({
  sectionId: yup.string().required('Section is Required'),
  firstLectureId: yup.string().required('First Lecture is Required'),
  secondLectureId: yup.string().required('Second Lecture is Required'),
});

type CollectionCreateFormProps = {
  visible: boolean;
  onCreate: (values: UpdateLectureOrdinalNumberFormValues) => Promise<void>;
  onCancel: () => void;
};

export default function UpdateLectureOrdinalNumberForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const courseDetails = useAppSelector(selectCourseDetails);

  const { data } = courseDetails;

  const sections = React.useMemo(() => {
    return data?.sections ?? [];
  }, [data]);

  const [lectures, setLectures] = React.useState<Lecture[]>([]);

  const methods = useForm<UpdateLectureOrdinalNumberFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const { watch, getValues, setValue, reset } = methods;

  const watchSectionId = watch('sectionId');

  const watchFirstLectureId = watch('firstLectureId');

  const watchSecondLectureId = watch('secondLectureId');

  React.useEffect(() => {
    if (watchSectionId) {
      const currentLectures =
        sections.find(section => section.id === watchSectionId)?.lectures ?? [];

      setLectures(currentLectures);

      if (
        watchFirstLectureId &&
        !currentLectures.find(lecture => lecture.id === watchFirstLectureId)
      ) {
        setValue('firstLectureId', '');
      }

      if (
        watchSecondLectureId &&
        !currentLectures.find(lecture => lecture.id === watchSecondLectureId)
      ) {
        setValue('secondLectureId', '');
      }
    }
  }, [
    sections,
    setValue,
    watchFirstLectureId,
    watchSecondLectureId,
    watchSectionId,
  ]);

  React.useEffect(() => {
    if (watchSecondLectureId && watchSecondLectureId === watchFirstLectureId) {
      setValue('secondLectureId', '');
    }
  }, [lectures, setValue, watchFirstLectureId, watchSecondLectureId]);

  const handleOk = async () => {
    await onCreate(getValues());

    reset();
  };

  return (
    <Modal
      visible={visible}
      title="Update lecture's ordinal number"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled: !watchFirstLectureId || !watchSecondLectureId,
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical">
          <FormSectionSelect
            name="sectionId"
            label="Choose a Section"
            sections={sections}
            checkDisabledForSection={true}
          />
          {watchSectionId && (
            <>
              <FormLectureSelect
                name="firstLectureId"
                label="Choose a Lecture "
                lectures={lectures}
              />
              {watchFirstLectureId && (
                <FormLectureSelect
                  name="secondLectureId"
                  label="Choose a Lecture to swap Ordinal number"
                  lectures={lectures.filter(
                    lecture => lecture.id !== watchFirstLectureId,
                  )}
                />
              )}
            </>
          )}
        </Form>
      </FormProvider>
    </Modal>
  );
}
