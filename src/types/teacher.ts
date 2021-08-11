import { User } from './user';

type TeacherInfo = {
  avatar: string;
  shortDescription?: string;
  detailDescription?: string;
};

export type Teacher = User & TeacherInfo;
