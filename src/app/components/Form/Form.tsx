import * as React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';

import { StateType as Course } from '../../../models/model/course';
import useStyles from './styles';
import { createCourse, updateCourse } from '../../../actions/courses';
import { useStore } from '../../../models/index';

// export default function Form({ currentId, setCurrentId }) {
export default function Form({ currentId }) {
  // const [courseState, courseActions] = React.useState({
  //   title: '',
  //   fee: '',
  //   image: '',
  //   description: '',
  // });
  const [courseState, courseActions] = useStore('Course');
  const course = useSelector((state: RootState) =>
    currentId ? state.courses.find((c: Course) => c.id === currentId) : null,
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (course) {
      // Set data
      courseActions.setCourse(course);
    }
  }, [course, courseActions]);

  // const clear = () => {
  //   setCurrentId(0);
  //   courseActions({ title: '', fee: '', image: '', description: '' });
  // };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // dispatch(createCourse(courseState));
    // delete courseState._id;

    // Take except id
    let { id, ...courseToTake } = courseState;

    // console.log(courseToTake);

    if (currentId === '') {
      dispatch(createCourse(courseToTake));
    } else {
      dispatch(updateCourse(currentId, courseToTake));
    }
    courseActions.clear();
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        {
          <>
            <Typography variant="h6">
              Creating a Course
              {/* {currentId ? `Editing "${post.title}"` : 'Creating a Memory'} */}
            </Typography>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={courseState.title}
              onChange={e => courseActions.setTitle(e.target.value)}
            />
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={courseState.description}
              onChange={e => courseActions.setDescription(e.target.value)}
            />
            <TextField
              name="fee"
              variant="outlined"
              label="Fee"
              fullWidth
              value={courseState.fee}
              onChange={e =>
                courseActions.setFee(Number(e.target.value.replace(/\D/, '')))
              }
            />
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => courseActions.setImage(base64)}
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={_ => courseActions.clear()}
              fullWidth
            >
              Clear
            </Button>
          </>
        }
      </form>
    </Paper>
  );
}
