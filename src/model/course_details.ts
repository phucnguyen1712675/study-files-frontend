import { Course } from './course';
import { SubCategory } from './subCategory';
import { Teacher } from './teacher';
import { Section } from './section';

type CourseDetailsInfo = {
  subCategory: SubCategory;
  teacher: Teacher;
  sections: Section[];
};

export type CourseDetails = Course & CourseDetailsInfo;
