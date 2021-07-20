import { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CountdownTimer from 'react-component-countdown-timer';

import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { axiosAuthInstance } from '../../../../api/auth';
import AppContext from 'app/AppContext';
import { useContext } from 'react';

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

export default function EmailVerifiedPage() {
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [countDown, setCountDown] = useState(600);

  const ResendOTPClick = async function () {
    // TODO trang resend email otp
    try {
      const data = {
        email: localStorage.studyFiles_user_email,
        id: localStorage.studyFiles_user_id,
      };
      const resSendEmail = await axiosAuthInstance.post(
        '/send-verification-email',
        data,
      );
      if (resSendEmail.status === 200) {
        alert('an Otp have sent to your register mail');
        setCountDown(600);
      } else {
        alert('something wrong ?');
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

  const onSubmit = async function (data) {
    // TODO trang send otp
    data = { ...data, id: localStorage.studyFiles_user_id };
    try {
      const resSendOTP = await axiosAuthInstance.post('/verify-email', data);
      if (resSendOTP.status === 200) {
        localStorage.studyFiles_user_isVerified = true;
        history.push('/');
      } else {
        if (resSendOTP.data) {
          alert(resSendOTP.data);
        }
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please verified Email
          </Typography>
          <div style={{ color: '#cecece', fontSize: 14, margin: '10px' }}>
            We have sent an OTP to the email address below
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#525252',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '20px' }}>Time left: </div>
            <CountdownTimer count={countDown} size={14} hideDay hideHours />
          </div>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              disabled
              variant="outlined"
              margin="normal"
              label="email"
              value={localStorage.studyFiles_user_email}
              defaultValue={localStorage.studyFiles_user_email}
              fullWidth
              {...register('email')}
            />
            {errors.email && <span>*</span>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="OTP"
              id="otp"
              {...register('otp', { required: true })}
            />
            {errors.otp && <span>*</span>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              OK
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={ResendOTPClick}>
                  {"Don't receive it? Resend"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
