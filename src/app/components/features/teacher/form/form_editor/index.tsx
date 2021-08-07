import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, Typography } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './index.css';

const { Text } = Typography;

type Props = {
  name: any;
  label: string;
};

export default function FormEditor({ name, label }: Props) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );

  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setValue(name, currentContentAsHTML);
  };

  let isError = false;
  let errorMessage = '';
  if (errors && errors.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errors[name].message;
  }

  return (
    <Form.Item label={label}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
    </Form.Item>
  );
}
