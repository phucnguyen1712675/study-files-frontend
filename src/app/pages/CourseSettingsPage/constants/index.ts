import GeneralInformationContent from '../components/general_information_content';
import CourseFeeAndPromotionContent from '../components/course_fee_and_promotion_content';
import CourseImageContent from '../components/course_image_content';
import CourseSectionContent from '../components/course_section_content';
import CourseLectureContent from '../components/course_lecture_content';
import VideosContent from '../components/videos_content';
import CourseStatusContent from '../components/course_status_content';

export const SIDER_MENU_ITEMS = [
  {
    id: '1',
    path: 'general',
    title: 'Update information',
    component: GeneralInformationContent,
  },
  {
    id: '2',
    path: 'fee_promotion',
    title: 'Fee & Promotion',
    component: CourseFeeAndPromotionContent,
  },
  {
    id: '3',
    path: 'image',
    title: 'Change image',
    component: CourseImageContent,
  },
  {
    id: '4',
    path: 'section',
    title: "Change section's info",
    component: CourseSectionContent,
  },
  {
    id: '5',
    path: 'lecture',
    title: "Change lecture's info",
    component: CourseLectureContent,
  },
  {
    id: '6',
    path: 'videos',
    title: 'Upload video',
    component: VideosContent,
  },
  {
    id: '7',
    path: 'status',
    title: 'Change status',
    component: CourseStatusContent,
  },
];
