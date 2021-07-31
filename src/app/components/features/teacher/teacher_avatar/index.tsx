import { Skeleton, Avatar } from 'antd';

export default function TeacherAvatar(props: {
  imageUrl: string | undefined;
  size: object;
}) {
  const { imageUrl, size } = props;

  return imageUrl ? (
    <Avatar src={imageUrl} size={size} />
  ) : (
    <Skeleton.Avatar active shape="circle" />
  );
}
