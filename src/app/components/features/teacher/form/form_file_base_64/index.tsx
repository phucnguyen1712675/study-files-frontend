import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, Typography, message, Image } from 'antd';
import FileBase from 'react-file-base64';
import { PLACEHOLDER_IMAGE_URL } from 'constants/images';

const { Text } = Typography;

type Props = {
  name: any;
  label: string;
  fileKey?: string;
  desiredFileType: 'image' | 'video';
  isShowImage?: boolean;
};

const isDesiredFileType = (fileType: string, desiredFileType: string) =>
  !!fileType.match(`${desiredFileType}.*`);

export default function FormFileBase64({
  name,
  label,
  fileKey,
  desiredFileType,
  isShowImage = false,
}: Props) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  let isError = false;
  let errorMessage = '';
  if (errors && errors.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errors[name].message;
  }
  const [src, setSrc] = useState('');

  const onDone = async ({ type, base64 }) => {
    const isMatchedType = isDesiredFileType(type, desiredFileType);

    if (isMatchedType) {
      try {
        setSrc(base64);
        setValue(name, base64);
      } catch (err) {
        setSrc('');
        console.log(err);
      }
    } else {
      setSrc('');
      setValue(name, '');

      message.warning(`Please select File with ${desiredFileType} type `);
    }
  };

  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FileBase {...field} key={fileKey} multiple={false} onDone={onDone} />
        )}
      />
      {isError && <Text type="danger">{errorMessage}</Text>}
      {isShowImage && src !== '' ? (
        <>
          <Image
            src={src}
            alt="chosen"
            style={{ height: '300px', marginTop: '30px' }}
            className="mb-3"
            placeholder={
              <Image
                preview={false}
                style={{ height: '300px' }}
                className="mb-3"
                src={PLACEHOLDER_IMAGE_URL}
              />
            }
          />
        </>
      ) : (
        <></>
      )}
    </Form.Item>
  );
}
