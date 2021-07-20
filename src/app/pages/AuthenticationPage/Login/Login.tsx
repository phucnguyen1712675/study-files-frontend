import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { axiosAuthInstance } from '../../../../api/auth';
import TopBar from '../../../components/Topbar/Topbar';
import AppContext from 'app/AppContext';
import { useContext } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function LoginPage() {
  const { dispatch } = useContext(AppContext) as any;
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ToRegister = function () {
    history.push('/register');
  };

  const onSubmit = async function (data) {
    try {
      const res = await axiosAuthInstance.post('/login', data);
      if (res.status === 200) {
        localStorage.studyFiles_user_accessToken = res.data.tokens.access.token;
        localStorage.studyFiles_user_refreshToken =
          res.data.tokens.refresh.token;
        localStorage.studyFiles_user_id = res.data.user.id;
        localStorage.studyFiles_user_role = res.data.user.role;
        localStorage.studyFiles_user_name = res.data.user.name;
        localStorage.studyFiles_user_email = res.data.user.email;

        dispatch({
          type: 'update_user_id',
          payload: {
            userId: res.data.user.id,
            user: res.data,
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
      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert(err.request);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <>
      <TopBar initQuery={''} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
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
            {errors.email && <span>*</span>}
            <TextField
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
            {errors.password && <span>*</span>}
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
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={ToRegister}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
