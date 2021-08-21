import { useContext } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Row, message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AppContext from '../../../AppContext';
import TopBar from '../../../components/Topbar/Topbar';
import { axiosAuthInstance } from '../../../../api/auth';
import { showLoadingSwal, closeSwal } from '../../../../utils/sweet_alert_2';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one letter and one number',
    ),
});

export default function SignUp() {
  const { dispatch } = useContext(AppContext) as any;
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const ToLogin = function () {
    history.push('/login');
  };

  const onSubmit = async data => {
    try {
      showLoadingSwal();
      const res = await axiosAuthInstance.post('/register', data);
      closeSwal();
      if (res.status === 201) {
        localStorage.studyFiles_user_accessToken = res.data.tokens.access.token;
        localStorage.studyFiles_user_accessToken_expires =
          res.data.tokens.access.expires;
        localStorage.studyFiles_user_refreshToken =
          res.data.tokens.refresh.token;
        localStorage.studyFiles_user_id = res.data.user.id;
        localStorage.studyFiles_user_role = res.data.user.role;
        localStorage.studyFiles_user_name = res.data.user.name;
        localStorage.studyFiles_user_email = res.data.user.email;
        localStorage.studyFiles_user_isVerified = res.data.user.isEmailVerified;
        dispatch({
          type: 'update_user_id',
          payload: {
            userId: res.data.user.id,
          },
        });
        if (localStorage.studyFiles_user_role === 'admin') {
          history.push('/admin');
        } else {
          const resSendEmail = await axiosAuthInstance.post(
            '/send-verification-email',
            {
              email: res.data.user.email,
              id: res.data.user.id,
            },
          );
          if (resSendEmail.status === 200) {
            alert('an Otp have sent to your register mail');
            history.push('/verifyEmail');
          } else {
            alert('something wrong ?');
          }
        }
      } else {
        alert('Invalid login.');
      }
    } catch (err) {
      closeSwal();

      if (err.response) {
        message.error(err.response.data.message);
      } else if (err.request) {
        message.error(err.request);
      } else {
        message.error(err.message);
      }
    }
  };

  return (
    <>
      <TopBar initQuery={''} />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                {/* <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Your Name"
                  autoFocus
                  {...register('name', { required: true })}
                /> */}
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="Your Name"
                  {...register('name')}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                {/* <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email', { required: true })}
                /> */}
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                {/* <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register('password', { required: true })}
                /> */}
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  label="Password"
                  {...register('password')}
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <Row justify="end">
          <Link onClick={ToLogin} variant="body2">
            Already have an account? Sign in
          </Link>
        </Row>
      </Container>
    </>
  );
}
