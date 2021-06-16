import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles';

export default function Course({ course, setCurrentId }) {
  const classes = useStyles();
  // TODO Add teacher info
  const creator = 'Michel Nguyen';
  const tags = ['tag-one', 'tag-two'];
  // const likeCount = 5;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={course.image}
        title={course.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{creator}</Typography>
        <Typography variant="body2">
          {moment(course.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          // onClick={() => {}}
          onClick={() => setCurrentId(course._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {tags.map((tag: String) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {course.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {}}
          // onClick={() => dispatch(likePost(course._id))}
        >
          <ThumbUpAltIcon fontSize="small" /> View {course.view}{' '}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {}}

          // onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
}
