import { Lecture } from './lecture';

export type Section = {
  id: string;
  courseId: string;
  title: string;
  ordinalNumber: number;
  lectures: Lecture[];
};
