import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import styles from '../Components/style.module/style.module.css';
import { useForm } from 'react-hook-form';
import { TextField, Typography, Container, Button } from '@material-ui/core/';
import useStyles from '../Components/style.module/UseStyles.js';
import Topbar from 'app/components/Topbar/Topbar';
import Footer from 'app/components/Footer/Footer';
import Sidebar from '../Components/SideBar/Sidebar';
import { axiosGuestInstance } from '../../../../api/guest';
import { AccessToken } from 'api/auth';

export function AdminUpdatePasswordPage() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (data) {
    try {
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosGuestInstance.patch(
        `/auth/update-password/${localStorage.studyFiles_user_id}`,
        data,
        config,
      );
      if (res.status === 200) {
        reset({});
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  return (
    <>
      <Topbar initQuery={''} />
      <Sidebar />
      <div className={styles.wrapper}>
        <Container component="main" className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.headerText}
          >
            Change password
          </Typography>
          <div className={classes.center}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="oldPassword"
                label="Old Password"
                autoComplete="oldPassword"
                autoFocus
                {...register('oldPassword', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'min length is 8',
                  },
                })}
              />
              {errors.oldPassword && (
                <span role="alert" style={{ color: 'red' }}>
                  {errors.oldPassword.message}
                </span>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="newPassword"
                label="New Password"
                autoComplete="newPassword"
                autoFocus
                {...register('newPassword', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'min length is 8',
                  },
                })}
              />
              {errors.newPassword && (
                <span role="alert" style={{ color: 'red' }}>
                  {errors.newPassword.message}
                </span>
              )}
              <Button
                type="submit"
                style={{ width: '130px' }}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
