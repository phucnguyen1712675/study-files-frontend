import { nanoid } from 'nanoid';

import AddCourseInformationContent from '../components/add_course_information_content';
import AddSectionsContent from '../components/add_sections_content';
import AddLecturesContent from '../components/add_lectures_content';

export const STEP_ITEMS = [
  {
    id: nanoid(),
    path: 'course_information',
    title: 'General Information',
    description: "Add Course's Information",
    component: AddCourseInformationContent,
  },
  {
    id: nanoid(),
    path: 'course_sections',
    title: 'Sections',
    description: "Add Course's Sections",
    component: AddSectionsContent,
  },
  {
    id: nanoid(),
    path: 'lecture_video',
    title: 'Lecture & Video',
    description: 'Add Lecture - Video',
    component: AddLecturesContent,
  },
];
