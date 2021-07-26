import { PlayCircleFilledSharp } from '@material-ui/icons';

export function SectionCard({ title, totalLectures, ordinalNumber }) {
  return (
    <div
      style={{
        color: '#525252',
        width: '100%',
      }}
    >
      <div
        style={{
          fontWeight: 'bolder',
          marginBottom: '10px',
        }}
      >
        section {ordinalNumber}: {title}
      </div>
      <div
        style={{
          fontWeight: 'lighter',
          color: '#999999',
          fontSize: 12,
        }}
      >
        {totalLectures} sections
      </div>
    </div>
  );
}

export function LectureCard({ title, endTime, ordinalNumber }) {
  const FormatEndTime = function () {
    const hours = Math.floor(endTime / 3600);
    const minutes = Math.floor((endTime - hours * 3600) / 60);
    const seconds = endTime - hours * 3600 - minutes * 60;
    let str = '';
    if (hours < 10 && hours > 0) {
      str = str + '0' + hours + ':';
    } else if (hours > 10) {
      str = str + hours + ':';
    }
    if (minutes < 10) {
      str = str + '0' + minutes + ':';
    } else {
      str = str + minutes + ':';
    }
    if (seconds < 10) {
      str = str + '0' + seconds;
    } else {
      str = str + seconds;
    }
    return str;
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
      <div style={{ marginLeft: '5px' }}>
        <div style={{ fontSize: 14 }}>
          lecture {ordinalNumber}: {title}
        </div>
        <div
          style={{
            fontWeight: 'lighter',
            color: '#999999',
            fontSize: 12,
            marginTop: '5px',
          }}
        >
          Milestones {FormatEndTime()}
        </div>
      </div>
    </div>
  );
}
