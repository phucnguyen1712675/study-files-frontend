import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Prompt } from 'react-router';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Checkbox } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react';
import 'video-react/dist/video-react.css';
import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';
import { SectionCard, LectureCard } from './components/Cards';
import { axiosInstance } from '../../../api/index';
import { AccessToken } from 'api/auth';

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
    backgroundColor: '#fafafa',
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

// TODO update history --> update lastWatchedLecture
export function StudyPage() {
  const location = useLocation();
  const courseName = location.state.courseName;
  const courseId = location.state.courseId;
  const myCourseId = location.state.myCourseId;
  let thisPlayer;
  const [lastLectureWatchedDB, setLastLectureWatchedDB] = useState(null);
  const [sections, setSections] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedSection, setSelectedSection] = useState(0);

  useEffect(
    function () {
      async function loadApp() {
        await AccessToken();
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
          },
        };
        try {
          const historiesRes = await axiosInstance.get(
            `/student/myCourses/${myCourseId}/histories`,
            config,
          );
          let historiesTemp = [];
          if (historiesRes.status === 200) {
            historiesTemp = [...historiesRes.data];
          }

          const lastLectureWatchedRes = await axiosInstance.get(
            `/student/myCourses/${myCourseId}/lastLectureWatched`,
            config,
          );
          let lastLectureWatchedDBTemp = {};
          if (lastLectureWatchedRes.status === 200) {
            lastLectureWatchedDBTemp = { ...lastLectureWatchedRes.data };
          }

          const sectionsRes = await axiosInstance.get(
            `/courses/${courseId}/sections?courseId=${courseId}&limit=20`,
          );
          let sectionsTemp = [];
          if (sectionsRes.status === 200) {
            sectionsTemp = [...sectionsRes.data.results];
          }

          let selectedLectureTemp = {};
          let lecturesTemp = [];
          for (var section of sectionsTemp) {
            for (var lecture of section.lectures) {
              lecture = {
                lecture: { ...lecture },
                endTime: 0,
                done: false,
                historyId: '',
              };
              for (var item of historiesTemp) {
                if (lecture.lecture.id === item.lectureId) {
                  lecture = {
                    ...lecture,
                    endTime: item.endTime,
                    done: item.done,
                    historyId: item.id,
                  };
                  if (item.id === lastLectureWatchedDBTemp.historyId) {
                    selectedLectureTemp = {
                      ...lecture,
                      endTime: item.endTime,
                      done: item.done,
                      historyId: item.id,
                      lastId: lastLectureWatchedDBTemp.id,
                    };
                    setSelectedSection(section.ordinalNumber);
                  }
                  break;
                }
              }
              lecturesTemp = [...lecturesTemp, lecture];
            }
          }

          if (!selectedLectureTemp.lecture) {
            selectedLectureTemp = { ...lecturesTemp[0], lastId: '' };
          }

          setSections([...sectionsTemp]);
          setLectures([...lecturesTemp]);
          setSelectedLecture({ ...selectedLectureTemp });
          setLastLectureWatchedDB({ ...lastLectureWatchedDBTemp });
        } catch (err) {
          if (err.response) {
            alert(err.response.data);
          }
        }
      }
      loadApp();
    },
    [courseId, myCourseId],
  );

  // expanded controll =================================
  const [expanded, setExpanded] = useState('');

  const handleExpandedChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // logic and data function handle =====================
  const UpdateHistoryLecture = async function (
    historyId,
    endTime,
    done,
    myCourseId,
    lectureId,
  ) {
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    const dataToSend = {
      endTime: endTime,
      done: done,
      myCourseId: myCourseId,
      lectureId: lectureId,
    };
    try {
      if (historyId !== '') {
        const res = await axiosInstance.patch(
          `/student/myCourses/${myCourseId}/histories/${historyId}`,
          dataToSend,
          config,
        );
        return res;
      } else {
        const res = await axiosInstance.post(
          `/student/myCourses/${myCourseId}/histories`,
          dataToSend,
          config,
        );
        return res;
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
      }
    }
  };

  const handleCheckBoxLectureChange = async function (e, lectureId) {
    const done = e.target.checked;
    const lecturesTemp = await Promise.all(
      lectures.map(async lecture => {
        if (lecture.lecture.id === lectureId) {
          const res = await UpdateHistoryLecture(
            lecture.historyId,
            lecture.endTime,
            done,
            myCourseId,
            lecture.lecture.id,
          );
          if (lecture.historyId !== '') {
            if (selectedLecture.lecture.id === lectureId) {
              setSelectedLecture({
                ...selectedLecture,
                done: done,
              });
            }
            return { ...lecture, done: done };
          } else {
            const historyId = res.data.id;
            if (selectedLecture.lecture.id === lectureId) {
              setSelectedLecture({
                ...selectedLecture,
                historyId: historyId,
                done: done,
              });
            }
            return { ...lecture, historyId: historyId, done: done };
          }
        }
        return lecture;
      }),
    );

    setLectures([...lecturesTemp]);
  };

  const SelectedNewLecture = async function (newLecture, ordinalNumber) {
    const { player } = thisPlayer.getState();
    const endTime = Math.floor(player.currentTime);
    newLecture = { ...newLecture, lastId: selectedLecture.lastId };

    const res = await UpdateHistoryLecture(
      selectedLecture.historyId,
      endTime,
      selectedLecture.done,
      myCourseId,
      selectedLecture.lecture.id,
    );

    let tempSelectedLecture = {
      ...selectedLecture,
      endTime: endTime,
    };
    delete tempSelectedLecture.lastId;

    if (tempSelectedLecture.historyId === '') {
      tempSelectedLecture = {
        ...tempSelectedLecture,
        historyId: res.data.id,
      };
    }

    // update lectures
    const newLectures = lectures.map(lecture => {
      if (lecture.lecture.id === tempSelectedLecture.lecture.id) {
        return tempSelectedLecture;
      }
      return lecture;
    });

    setLectures([...newLectures]);
    setSelectedLecture({ ...newLecture });
    setSelectedSection(ordinalNumber);
    player.seek = newLecture.endTime;
  };

  const SaveLastLectureWatched = async function () {
    const { player } = thisPlayer.getState();
    const endTime = Math.floor(player.currentTime);

    const res = await UpdateHistoryLecture(
      selectedLecture.historyId,
      endTime,
      selectedLecture.done,
      myCourseId,
      selectedLecture.lecture.id,
    );
    const historyId = res.data.id;
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    const dataToSend = {
      historyId: historyId,
      myCourseId: myCourseId,
    };

    try {
      let tempSelectedLecture = {
        ...selectedLecture,
        endTime: endTime,
        historyId: historyId,
      };
      if (selectedLecture.lastId === '') {
        // post new last lecture watched
        const res = await axiosInstance.post(
          `/student/myCourses/${myCourseId}/lastLectureWatched`,
          dataToSend,
          config,
        );
        tempSelectedLecture = { ...selectedLecture, lastId: res.data.id };
      } else {
        // patch last lecture watched
        await axiosInstance.patch(
          `/student/myCourses/${myCourseId}/lastLectureWatched/${selectedLecture.lastId}`,
          dataToSend,
          config,
        );
      }
      // update selectedLecture
      setSelectedLecture({ ...tempSelectedLecture });
      // update lectures
      const newLectures = lectures.map(lecture => {
        if (lecture.lecture.id === tempSelectedLecture.lecture.id) {
          return tempSelectedLecture;
        }
        return lecture;
      });

      setLectures([...newLectures]);
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
      }
    }
  };

  // widget build ========================================
  const TitleWidget = function () {
    if (selectedLecture !== null) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontWeight: 'bolder',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 18 }}>{courseName}/</div>
          <div style={{ fontSize: 16, color: '#387cff' }}>
            Section: {selectedSection} / {selectedLecture.lecture.ordinalNumber}
            : {selectedLecture.lecture.title}
          </div>
        </div>
      );
    }
    return <></>;
  };

  const VideoWidget = function () {
    if (selectedLecture !== null) {
      return (
        <div style={{ width: '65%', height: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: '#041d33',
            }}
          >
            <Player
              ref={player => {
                thisPlayer = player;
              }}
              startTime={selectedLecture.endTime}
              src={selectedLecture.lecture.videoUrl}
            >
              <ControlBar>
                <ReplayControl seconds={10} order={1.1} />
                <ForwardControl seconds={30} order={1.2} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <PlaybackRateMenuButton
                  rates={[5, 2, 1, 0.5, 0.1]}
                  order={7.1}
                />
                <VolumeMenuButton disabled />
              </ControlBar>
            </Player>
          </div>
        </div>
      );
    }
    return <></>;
  };

  const SectionListWidget = function () {
    if (sections !== null && lectures !== null) {
      return (
        <div style={{ width: '35%' }}>
          <div
            style={{ marginBottom: '10px', fontSize: 24, fontWeight: 'bolder' }}
          >
            Course content
          </div>
          {sections.map(section => {
            const totalLectures = section.lectures.length;
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
                  <SectionCard
                    title={section.title}
                    ordinalNumber={section.ordinalNumber}
                    totalLectures={totalLectures}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: '100%' }}>
                    {lectures
                      .filter(
                        lecture =>
                          lecture.lecture &&
                          lecture.lecture.sectionId === section.id,
                      )
                      .map(lecture => {
                        return (
                          <div
                            key={lecture.lecture.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox
                              style={{ marginRight: '10px' }}
                              onChange={e =>
                                handleCheckBoxLectureChange(
                                  e,
                                  lecture.lecture.id,
                                )
                              }
                              checked={lecture.done}
                              defaultChecked
                              color="default"
                              inputProps={{
                                'aria-label': 'checkbox with default color',
                              }}
                            />
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                SelectedNewLecture(
                                  lecture,
                                  section.ordinalNumber,
                                )
                              }
                            >
                              <LectureCard
                                ordinalNumber={lecture.lecture.ordinalNumber}
                                title={lecture.lecture.title}
                                endTime={lecture.endTime}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <Prompt
        message={async () => {
          await SaveLastLectureWatched();
        }}
      />
      <TopBar initQuery={''} />
      {TitleWidget()}
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          color: '#525252',
        }}
      >
        {VideoWidget()}
        {SectionListWidget()}
      </div>
      <Footer />
    </>
  );
}
