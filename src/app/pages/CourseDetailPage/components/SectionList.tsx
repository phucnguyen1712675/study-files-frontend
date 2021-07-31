import React, { useState } from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { SectionCard, LectureCard } from './components';

const Accordion = withStyles({
  root: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))(MuiAccordionDetails);

export function SectionList({ sectionList }) {
  const [expanded, setExpanded] = useState('');

  const handleExpandedChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {sectionList.map(section => {
        return (
          <Accordion
            key={section.id}
            expanded={expanded === `panel${section.id}`}
            onChange={handleExpandedChange(`panel${section.id}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <SectionCard section={section} />
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: '100%' }}>
                {section.lectures.map(lecture => {
                  return <LectureCard key={lecture.id} lecture={lecture} />;
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}

// export function SampleDataSections() {
//   return [
//     {
//       id: '1',
//       courseId: '1',
//       title: 'Introduction',
//       ordinalNumber: 0,
//       lectures: [
//         {
//           id: '1',
//           sectionId: '1',
//           title: 'COURSE UPDATES CHANGELOG',
//           ordinalNumber: 0,
//           canPreview: true,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
//         },
//         {
//           id: '2',
//           sectionId: '1',
//           title: 'Download the PDF resources of the video course',
//           ordinalNumber: 1,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031737/course_videos/lmstkld7us93hzmferuo.mp4',
//         },
//         {
//           id: '3',
//           sectionId: '1',
//           title: 'Download & Install VirtualBox',
//           ordinalNumber: 2,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031771/course_videos/udfxaoznduitkye4vngo.mp4',
//         },
//       ],
//     },
//     {
//       id: '2',
//       courseId: '1',
//       title: 'Easy installation of Kali Linux as a virtual machine on Windows',
//       ordinalNumber: 1,
//       lectures: [
//         {
//           id: '4',
//           sectionId: '2',
//           title: 'Installing Kali Linux with Virtualbox on Mac',
//           ordinalNumber: 0,
//           canPreview: true,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031801/course_videos/wjbrykkrdrulcdjkihkm.mp4',
//         },
//         {
//           id: '5',
//           sectionId: '2',
//           title: 'ANTI-ERROR CHECKLIST',
//           ordinalNumber: 1,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283559/course_videos/1_minute_video_introduction___Ceejay_Rain___Freelancer_fnvax4.mp4',
//         },
//         {
//           id: '6',
//           sectionId: '2',
//           title: 'Solve common errors with Virtualbox & Kali Linux',
//           ordinalNumber: 2,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283519/course_videos/3790642373868340894_-_Copy_mguh8x.mp4',
//         },
//       ],
//     },
//     {
//       id: '3',
//       courseId: '1',
//       title: 'Getting started with Kali Linux',
//       ordinalNumber: 2,
//       lectures: [
//         {
//           id: '7',
//           sectionId: '3',
//           title: 'Basic commands in Kali Linux (and Linux)',
//           ordinalNumber: 0,
//           canPreview: true,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283525/course_videos/Perfection_-_1_Minute_Short_Film_for_Film_Riot_s_Stay_at_Home_Challenge_qewmva.mp4',
//         },
//         {
//           id: '8',
//           sectionId: '3',
//           title: 'Introduction to C programming in Kali',
//           ordinalNumber: 1,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283525/course_videos/6_AM___Film_Riot_-_One_Minute_Short_Contest_h8f0rx.mp4',
//         },
//         {
//           id: '9',
//           sectionId: '3',
//           title: 'Introduction to Python programming in Kali',
//           ordinalNumber: 2,
//           canPreview: false,
//           videoUrl:
//             'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283521/course_videos/Toast_-_One_Minute_Comedy_Film___Award_Winning_mif8bm.mp4',
//         },
//       ],
//     },
//   ];
// }

// export function SampleDataStudyHistory() {
//   return [
//     {
//       id: '1',
//       myCourseId: '1',
//       lectureId: '1',
//       endTime: 59,
//       done: true,
//     },
//     {
//       id: '2',
//       myCourseId: '1',
//       lectureId: '2',
//       endTime: 90,
//       done: true,
//     },
//     {
//       id: '3',
//       myCourseId: '1',
//       lectureId: '3',
//       endTime: 45,
//       done: false,
//     },
//     {
//       id: '4',
//       myCourseId: '1',
//       lectureId: '4',
//       endTime: 59,
//       done: true,
//     },
//     {
//       id: '5',
//       myCourseId: '1',
//       lectureId: '6',
//       endTime: 15,
//       done: true,
//     },
//   ];
// }

// export function SampleDataLastLectureWatched() {
//   return {
//     id: '1',
//     historyId: '2',
//     myCourseId: '1',
//   };
// }

// export function SampleDataImages() {
//   return [
//     `https://samderlust.com/wp-content/uploads/2019/09/flutter.png`,
//     `https://images.squarespace-cdn.com/content/v1/5489b1f6e4b0c7fbb9e64fcb/1562336077272-599P21ZJNMF63VACZ169/maxresdefault.jpg`,
//     `https://www.envertis.com.au/wp-content/uploads/2018/12/flutter-1-1200x677.png`,
//     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_7PJIIqOxcfB-ImJQHeN7Z-5oYln_vQgYg&usqp=CAU`,
//     `https://blog.crowdbotics.com/content/images/2020/03/React-Native-Featured-Image-1.png`,
//     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DFk3vylWWP4haGcMo_i2SiAJ6JvpPMlrAQ&usqp=CAU`,
//     `https://itviec.com/blog/wp-content/uploads/2020/01/nodejs-la-gi-thumbnail.png`,
//     `https://docs.tilt.dev/assets/docimg/example-nodejs-1-measured.png`,
//     `https://banzaicloud.com/img/blog/nodejs/nodejs-in-production.png`,
//     `https://miro.medium.com/max/2404/1*ODU5V_oAmYmzvZ1wIw3rDw.png`,
//     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeXYeSn5OufBrCkfDXB8ZDTg19jhsb5OLvfQ&usqp=CAU`,
//     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS54tGFeefVvu_KjuwTMJCFDO0gwbiCwrrzjA&usqp=CAU`,
//     `https://i.ytimg.com/vi/_1xa8Bsho6A/maxresdefault.jpg`,
//     `https://cdn.buttercms.com/3FHJ3r3KT9iWbj2k6a7T`,
//     `https://guardian.ng/wp-content/uploads/2021/05/Design-Sketches-Image-Attitude-Academy-1062x531.jpg`,
//     `https://www.lcca.org.uk/media/572154/how-to-become-a-successful-fashion-designer.jpg?mode=crop&quality=75&width=860&height=485`,
//     `https://blog.upes.ac.in/wp-content/uploads/2019/09/fashion-designer.jpg`,
//     `https://www.nerdynaut.com/wp-content/uploads/2020/06/How-to-Become-a-Fashion-Designer-in-the-USA.jpg`,
//     `https://img.collegedekhocdn.com/media/img/careers/fashion111.jpg`,
//     `https://d1ac9zce9817ms.cloudfront.net/images/21%20-%20Top%20Fashion%20Jobs%20in%20Canada-1598003863242.jpg`,
//     `https://timviec365.vn/pictures/images/tu-duy-sang-tao-la-gi.jpg`,
//     `https://seeding.vn/wp-content/uploads/2019/11/T%C6%B0-duy-s%C3%A1ng-t%E1%BA%A1o-l%C3%A0-g%C3%AC.jpg`,
//     `https://taptrangdiem.net/wp-content/uploads/2018/06/vai-tro-cua-tu-duy-sang-tao-1-min.jpg`,
//     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5yes3qQ2H0XtLzfZPwiAHnwCT7yCtEmaNOw&usqp=CAU`,
//   ];
// }
