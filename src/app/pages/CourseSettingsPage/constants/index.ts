import GeneralInformationContent from '../components/general_information_content';
import CourseFeeAndPromotionContent from '../components/course_fee_and_promotion_content';
import CourseImageContent from '../components/course_image_content';
import CourseSectionContent from '../components/course_section_content';
import CourseLectureContent from '../components/course_lecture_content';
import VideosContent from '../components/videos_content';
import CourseStatusContent from '../components/course_status_content';

export const SIDER_MENU_ITEMS = [
  {
    path: 'general',
    title: 'Update information',
    component: GeneralInformationContent,
  },
  {
    path: 'fee_promotion',
    title: 'Fee & Promotion',
    component: CourseFeeAndPromotionContent,
  },
  {
    path: 'image',
    title: 'Change image',
    component: CourseImageContent,
  },
  {
    path: 'section',
    title: "Change section's info",
    component: CourseSectionContent,
  },
  {
    path: 'lecture',
    title: "Change lecture's info",
    component: CourseLectureContent,
  },
  {
    path: 'videos',
    title: 'Upload video',
    component: VideosContent,
  },
  {
    path: 'status',
    title: 'Change status',
    component: CourseStatusContent,
  },
];