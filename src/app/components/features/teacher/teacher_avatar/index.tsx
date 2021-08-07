import { Skeleton, Avatar } from 'antd';

type Props = {
  imageUrl?: string;
  size: object;
};

export default function TeacherAvatar({ imageUrl, size }: Props) {
  return imageUrl ? (
    <Avatar src={imageUrl} size={size} />
  ) : (
    <Skeleton.Avatar active shape="circle" />
  );
}
