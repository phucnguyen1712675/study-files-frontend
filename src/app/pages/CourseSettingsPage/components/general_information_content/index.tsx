import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Skeleton, Button, message } from 'antd';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { updatedDiff } from 'deep-object-diff';

import './index.css';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
import FormInput from '../../../../components/features/teacher/form/form_input';
import FormTextArea from '../../../../components/features/teacher/form/form_text_area';
import FormSubCategoryOptGroupSelect from '../../../../components/features/teacher/form/form_sub_category_opt_group_select';
import PageHelmet from '../../../../components/features/teacher/page_helmet';
import HeaderSiderContentLayout from '../../../../components/features/teacher/header_sider_content_layout';
import {
  COURSE_NAME_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_SHORT_DESCRIPTION_MIN_LENGTH,
  COURSE_SHORT_DESCRIPTION_MAX_LENGTH,
  COURSE_DETAIL_DESCRIPTION_MIN_LENGTH,
  COURSE_DETAIL_DESCRIPTION_MAX_LENGTH,
} from '../../../../../constants/course';
import {
  selectCourseDetails,
  selectCategoryDetails,
} from '../../../../../features/teacher/teacherSlice';
import {
  getCategoriesDetails,
  getCourseDetails,
} from '../../../../../features/teacher/teacherThunkAPI';
import { updateCourse } from '../../../../../features/teacher/teacherAPI';

type FormValues = {
  name: string;
  shortDescription: string;
  detailDescription: string;
  subCategoryId: string;
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
  subCategoryId: yup.string().required(),
});

export default function GeneralInformationContent() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCategoriesDetails());
  }, [dispatch]);

  const courseDetails = useAppSelector(selectCourseDetails);

  const categoriesDetails = useAppSelector(selectCategoryDetails);

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: React.useMemo(() => {
      return {
        name: courseDetails.data?.name,
        shortDescription: courseDetails.data?.shortDescription,
        detailDescription: courseDetails.data?.detailDescription,
        subCategoryId: courseDetails.data?.subCategoryId,
      };
    }, [courseDetails]),
  });

  const { handleSubmit, setValue, watch } = methods;

  const watchSubCategoryId = watch('subCategoryId');

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML(editorState);
  };

  const convertContentToHTML = React.useCallback(
    editor => {
      let currentContentAsHTML = convertToHTML(editor.getCurrentContent());
      setValue('detailDescription', currentContentAsHTML);
    },
    [setValue],
  );

  React.useEffect(() => {
    setValue('name', courseDetails.data?.name ?? '');
    setValue('shortDescription', courseDetails.data?.shortDescription ?? '');
    setValue('subCategoryId', courseDetails.data?.subCategoryId ?? '');

    const detailValue = courseDetails.data
      ? courseDetails.data?.detailDescription.replaceAll('&lt;', '<')
      : '<p>Hey this <strong>editor</strong> rocks 😀</p>';

    var contentBlock = htmlToDraft(detailValue);

    var editorStateInitial: any;

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      editorStateInitial = EditorState.createWithContent(contentState);
    }

    setEditorState(editorStateInitial);
    convertContentToHTML(editorStateInitial);
  }, [courseDetails, setValue, convertContentToHTML]);

  const onSubmit = handleSubmit(async (values: FormValues) => {
    const courseData = courseDetails.data!;

    const toCompareData = {
      ...values,
      detailDescription: values.detailDescription.replaceAll('<', '&lt;'),
    };

    const difference = updatedDiff(courseData, toCompareData);

    if (
      !difference ||
      Object.keys(difference).length !== 0 ||
      difference.constructor !== Object
    ) {
      setLoading(true);

      const differenceToUpdate = updatedDiff(courseData, values);

      const { id } = courseData;

      const payload = {
        ...differenceToUpdate,
        courseId: id,
      };

      const response = await updateCourse(payload);

      if (!response || response.status !== 200) {
        message.error(`Error: ${response}`);
      } else {
        message.success('Processing complete!');

        dispatch(getCourseDetails(id));
      }

      setLoading(false);
    } else {
      message.success('Processing complete!');
    }
  });

  return (
    <>
      <PageHelmet title="General information" />
      {courseDetails.isLoading &&
      categoriesDetails.isLoading &&
      !courseDetails.data ? (
        <Skeleton active avatar paragraph={{ rows: 16 }} />
      ) : (
        <HeaderSiderContentLayout
          components={[
            {
              title: 'General information',
              children: (
                <FormProvider {...methods}>
                  <Form layout="vertical" onFinish={onSubmit}>
                    <FormInput name="name" label="Name" />
                    <FormTextArea
                      name="shortDescription"
                      label="Short description"
                      autoSize={false}
                    />
                    <Form.Item label="Detail description">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                      />
                    </Form.Item>
                    <FormSubCategoryOptGroupSelect
                      name="subCategoryId"
                      label="Sub category"
                      defaultValue={watchSubCategoryId}
                      categories={categoriesDetails.data}
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
              ),
            },
          ]}
        />
      )}
    </>
  );
}
