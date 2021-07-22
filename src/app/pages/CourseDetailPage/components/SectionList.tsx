import React, { useContext, useState, useEffect } from 'react';
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

export function SampleDataVideos() {
  return [
    {
      id: '1',
      courseId: '1',
      title: 'Introduction',
      ordinalNumber: 1,
      lectures: [
        {
          id: '1',
          sectionId: '1',
          title: 'COURSE UPDATES CHANGELOG',
          ordinalNumber: 1,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '2',
          sectionId: '1',
          title: 'Download the PDF resources of the video course',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '3',
          sectionId: '1',
          title: 'Download & Install VirtualBox',
          ordinalNumber: 3,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
      ],
    },
    {
      id: '2',
      courseId: '1',
      title: 'Easy installation of Kali Linux as a virtual machine on Windows',
      ordinalNumber: 2,
      lectures: [
        {
          id: '1',
          sectionId: '2',
          title: 'Installing Kali Linux with Virtualbox on Mac',
          ordinalNumber: 1,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '2',
          sectionId: '3',
          title: 'ANTI-ERROR CHECKLIST',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '3',
          sectionId: '2',
          title: 'Solve common errors with Virtualbox & Kali Linux',
          ordinalNumber: 3,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
      ],
    },
    {
      id: '3',
      courseId: '1',
      title: 'Getting started with Kali Linux',
      ordinalNumber: 3,
      lectures: [
        {
          id: '1',
          sectionId: '3',
          title: 'Basic commands in Kali Linux (and Linux)',
          ordinalNumber: 1,
          canPreview: true,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '2',
          sectionId: '3',
          title: 'Introduction to C programming in Kali',
          ordinalNumber: 2,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
        {
          id: '3',
          sectionId: '3',
          title: 'Introduction to Python programming in Kali',
          ordinalNumber: 3,
          canPreview: false,
          videoUrl:
            'https://res.cloudinary.com/dqstbfcdu/video/upload/v1626858741/course_videos/Lockdown___One_Minute_Short_Film_Challenge___Film_Riot_iwxxox.mp4',
        },
      ],
    },
  ];
}
