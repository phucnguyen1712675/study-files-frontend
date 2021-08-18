import { useContext } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginPage() {
  const { dispatch } = useContext(AppContext) as any;
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const ToRegister = function () {
    history.push('/register');
  };

  const onSubmit = async data => {
    try {
      showLoadingSwal();

      const res = await axiosAuthInstance.post('/login', data);

      closeSwal();

      if (res.status === 200) {
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
          history.push('/admin/users');
        } else {
          history.push('/');
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register('email', { required: true })}
            />
            {errors.email && <span>*</span>} */}
            <div style={{ marginTop: '20px' }}>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                label="Email Address"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: true })}
            />
            {errors.password && <span>*</span>} */}
            <div style={{ marginTop: '20px' }}>
              <TextField
                margin="normal"
                type="password"
                variant="outlined"
                fullWidth
                label="Password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Row justify="end">
          <Link variant="body2" onClick={ToRegister}>
            Don't have an account? Sign Up
          </Link>
        </Row>
      </Container>
    </>
  );
}
