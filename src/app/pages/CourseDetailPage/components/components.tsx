import { PlayCircleFilledSharp } from '@material-ui/icons';
import SkyLight from 'react-skylight';
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

export function SectionCard({ section }) {
  const totalLecture = function () {
    return section.lectures.length;
  };

  return (
    <div
      style={{
        color: '#525252',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          fontWeight: 'bolder',
        }}
      >
        {section.title}
      </div>
      <div
        style={{
          fontWeight: 'lighter',
          color: '#999999',
          fontSize: 12,
          marginLeft: 'auto',
        }}
      >
        {totalLecture()} sections
      </div>
    </div>
  );
}

export function LectureCard({ lecture }) {
  let simpleDialog: any;

  const PreviewLecture = function (publicId) {
    simpleDialog.show();
  };

  var LecturePreviewDialogOverStyle = {
    backgroundColor: '#041d33',
    color: '#fafafa',
    width: '70%',
    height: '80%',
    marginTop: '-250px',
    zIndex: 100,
    marginLeft: '-35%',
  };

  return (
    <div
      style={{
        color: '#525252',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '7px 0px',
      }}
    >
      <PlayCircleFilledSharp style={{ fontSize: 14, marginRight: '10px' }} />
      <div style={{ fontSize: 14, flexGrow: 1 }}>{lecture.title}</div>
      {lecture.canPreview ? (
        <div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 14,
              color: '#387cff',
              cursor: 'pointer',
            }}
            onClick={() => PreviewLecture(lecture.publicId)}
          >
            Preview
          </div>
          <SkyLight
            hideOnOverlayClicked
            dialogStyles={LecturePreviewDialogOverStyle}
            ref={ref => (simpleDialog = ref)}
            title={
              <div
                style={{ margin: '10px 0px 0px 10px', fontWeight: 'bolder' }}
              >
                {lecture.title}
              </div>
            }
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Player
                width={'90%'}
                height={'90%'}
                fluid={false}
                src={lecture.videoUrl}
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
          </SkyLight>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
