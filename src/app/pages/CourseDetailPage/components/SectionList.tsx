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

export function SampleDataSections() {
  return [
    {
      id: '1',
      courseId: '1',
      title: 'Introduction',
      ordinalNumber: 0,
      lectures: [
        {
          id: '1',
          sectionId: '1',
          title: 'COURSE UPDATES CHANGELOG',
          ordinalNumber: 0,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '2',
          sectionId: '1',
          title: 'Download the PDF resources of the video course',
          ordinalNumber: 1,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031737/course_videos/lmstkld7us93hzmferuo.mp4',
        },
        {
          id: '3',
          sectionId: '1',
          title: 'Download & Install VirtualBox',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031771/course_videos/udfxaoznduitkye4vngo.mp4',
        },
      ],
    },
    {
      id: '2',
      courseId: '1',
      title: 'Easy installation of Kali Linux as a virtual machine on Windows',
      ordinalNumber: 1,
      lectures: [
        {
          id: '4',
          sectionId: '2',
          title: 'Installing Kali Linux with Virtualbox on Mac',
          ordinalNumber: 0,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627031801/course_videos/wjbrykkrdrulcdjkihkm.mp4',
        },
        {
          id: '5',
          sectionId: '2',
          title: 'ANTI-ERROR CHECKLIST',
          ordinalNumber: 1,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283559/course_videos/1_minute_video_introduction___Ceejay_Rain___Freelancer_fnvax4.mp4',
        },
        {
          id: '6',
          sectionId: '2',
          title: 'Solve common errors with Virtualbox & Kali Linux',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283519/course_videos/3790642373868340894_-_Copy_mguh8x.mp4',
        },
      ],
    },
    {
      id: '3',
      courseId: '1',
      title: 'Getting started with Kali Linux',
      ordinalNumber: 2,
      lectures: [
        {
          id: '7',
          sectionId: '3',
          title: 'Basic commands in Kali Linux (and Linux)',
          ordinalNumber: 0,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283525/course_videos/Perfection_-_1_Minute_Short_Film_for_Film_Riot_s_Stay_at_Home_Challenge_qewmva.mp4',
        },
        {
          id: '8',
          sectionId: '3',
          title: 'Introduction to C programming in Kali',
          ordinalNumber: 1,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283525/course_videos/6_AM___Film_Riot_-_One_Minute_Short_Contest_h8f0rx.mp4',
        },
        {
          id: '9',
          sectionId: '3',
          title: 'Introduction to Python programming in Kali',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1627283521/course_videos/Toast_-_One_Minute_Comedy_Film___Award_Winning_mif8bm.mp4',
        },
      ],
    },
  ];
}
