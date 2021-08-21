import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, message, Typography } from 'antd';
import moment from 'moment';
import { nanoid } from 'nanoid';

import CustomContent from '../custom_content';
import { useAppSelector, useAppDispatch } from '../../../../../hooks';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormTextArea from '../../../../components/features/teacher/form/form_text_area';
import FormEditor from '../../../../components/features/teacher/form/form_editor';
import FormSubCategoryOptGroupSelect from '../../../../components/features/teacher/form/form_sub_category_opt_group_select';
import FormCheckbox from '../../../../components/features/teacher/form/form_checkbox';
import FormNumberInput from '../../../../components/features/teacher/form/form_number_input';
import FormSwitch from '../../../../components/features/teacher/form/form_switch';
import FormRangePicker from '../../../../components/features/teacher/form/form_range_picker';
import FormFileBase64 from '../../../../components/features/teacher/form/form_file_base_64';
import {
  COURSE_NAME_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_SHORT_DESCRIPTION_MIN_LENGTH,
  COURSE_SHORT_DESCRIPTION_MAX_LENGTH,
  COURSE_DETAIL_DESCRIPTION_MIN_LENGTH,
  COURSE_DETAIL_DESCRIPTION_MAX_LENGTH,
  COURSE_ORIGINAL_FEE_MIN_VALUE,
  COURSE_ORIGINAL_FEE_MAX_VALUE,
  COURSE_FEE_MIN_VALUE,
} from '../../../../../constants/course';
import {
  selectCategoryDetails,
  setNewCourseId,
} from '../../../../../features/teacher/teacherSlice';
import { getCategoriesDetails } from '../../../../../features/teacher/teacherThunkAPI';
import { addCourse } from '../../../../../features/teacher/teacherAPI';

const { Text } = Typography;

type FormValues = {
  name: string;
  shortDescription: string;
  detailDescription: string;
  subCategoryId: string;
  status: boolean;
  originalFee: number;
  hasPromotion: boolean;
  fee: number;
  promotionStart: Date;
  promotionEnd: Date;
  image: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(COURSE_NAME_MIN_LENGTH)
    .max(COURSE_NAME_MAX_LENGTH)
    .required('Name is Required'),
  shortDescription: yup
    .string()
    .min(COURSE_SHORT_DESCRIPTION_MIN_LENGTH)
    .max(COURSE_SHORT_DESCRIPTION_MAX_LENGTH)
    .required('Short Description is Required'),
  detailDescription: yup
    .string()
    .min(COURSE_DETAIL_DESCRIPTION_MIN_LENGTH)
    .max(COURSE_DETAIL_DESCRIPTION_MAX_LENGTH)
    .required('Detail Description is Required'),
  subCategoryId: yup.string().required('Sub Category is Required'),
  status: yup.boolean(),
  originalFee: yup
    .number()
    .min(COURSE_ORIGINAL_FEE_MIN_VALUE)
    .max(COURSE_ORIGINAL_FEE_MAX_VALUE)
    .required('Original Fee is Required'),
  hasPromotion: yup.boolean(),
  fee: yup.number(),
  promotionStart: yup
    .date()
    .when('hasPromotion', (hasPromotion: boolean, schema) => {
      return hasPromotion
        ? schema.required(
            'Promotion Start Date is required when Has promotion is true',
          )
        : undefined;
    }),
  promotionEnd: yup
    .date()
    .when('promotionStart', (promotionStart: Date, schema) => {
      return promotionStart
        ? schema.required(
            'Promotion End Date is required when has Promotion Start Date',
          )
        : undefined;
    }),
  image: yup.string().required('Image is Required'),
});

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

var imageKey = nanoid();

export default function AddCourseInformationContent() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCategoriesDetails());
  }, [dispatch]);

  const categoriesDetails = useAppSelector(selectCategoryDetails);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [shouldShowNextButton, setShouldShowNextButton] = React.useState<
    boolean
  >(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch } = methods;

  const watchOriginalFee = watch('originalFee');

  const watchHasPromotion = watch('hasPromotion');

  const onFinish = handleSubmit(async (values: FormValues) => {
    setLoading(true);

    const { hasPromotion, ...data } = values;

    var payload: object;

    const teacherId = localStorage.studyFiles_user_id;

    if (!hasPromotion) {
      const { promotionStart, promotionEnd, ...rest } = data;

      payload = { ...rest, fee: rest.originalFee, teacherId };
    } else {
      payload = {
        ...data,
        teacherId,
      };
    }

    const response = await addCourse(payload);

    if (!response || response.status !== 201) {
      message.error(`Error: ${response}`);
    } else {
      const { id } = response?.data;

      dispatch(setNewCourseId(id));

      setShouldShowNextButton(true);

      imageKey = nanoid();

      window.scrollTo(0, 0);

      message.success('Processing complete!');
    }

    setLoading(false);
  });

  return (
    <>
      <PageHelmet title="General information" />
      <CustomContent
        step={0}
        shouldShowNextButton={shouldShowNextButton}
        children={
          <>
            <FormProvider {...methods}>
              <Form layout="vertical" onFinish={onFinish}>
                <FormInput name="name" label="Name" placeholder="Enter name" />
                <FormTextArea
                  name="shortDescription"
                  label="Short description"
                  placeholder="Enter short description"
                  autoSize={true}
                />
                <FormEditor
                  name="detailDescription"
                  label="Detail description"
                />
                <FormSubCategoryOptGroupSelect
                  name="subCategoryId"
                  label="Sub category"
                  categories={categoriesDetails.data}
                />
                <FormCheckbox
                  name="status"
                  label="This course is completed"
                  defaultChecked={false}
                />
                <FormNumberInput
                  name="originalFee"
                  label="Original Fee"
                  defaultValue={0}
                  min={COURSE_ORIGINAL_FEE_MIN_VALUE}
                  max={COURSE_ORIGINAL_FEE_MAX_VALUE}
                  note={
                    <Text type="warning">{`Value <= ${COURSE_ORIGINAL_FEE_MAX_VALUE} $`}</Text>
                  }
                />
                {watchOriginalFee > 0 && (
                  <>
                    <FormSwitch
                      name="hasPromotion"
                      label="Has promotion"
                      defaultChecked={false}
                    />
                    {watchHasPromotion && (
                      <>
                        <FormNumberInput
                          name="fee"
                          label="Discount Fee"
                          defaultValue={0}
                          min={COURSE_FEE_MIN_VALUE}
                          max={watchOriginalFee - 0.01}
                          note={
                            <Text type="warning">{`Value < ${watchOriginalFee} $`}</Text>
                          }
                        />
                        <FormRangePicker
                          label="Promotion date range"
                          stateTimeName="promotionStart"
                          endTimeName="promotionEnd"
                          disabledDate={disabledDate}
                        />
                      </>
                    )}
                  </>
                )}
                <FormFileBase64
                  name="image"
                  label="Image"
                  fileKey={imageKey}
                  desiredFileType="image"
                  isShowImage={true}
                />
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </FormProvider>
          </>
        }
      />
    </>
  );
}
