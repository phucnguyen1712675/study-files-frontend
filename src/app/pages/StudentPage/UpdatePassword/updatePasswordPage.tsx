import { Button, Container, TextField, Typography } from '@material-ui/core';
import Footer from 'app/components/Footer/Footer';
import Topbar from 'app/components/Topbar/Topbar';
import styles from '../components/style.module.css';
import Sidebar from 'app/pages/AdminPage/Components/SideBar/Sidebar';
import useStyles from 'app/pages/AdminPage/Components/style.module/UseStyles';
import { useForm } from 'react-hook-form';
import { axiosInstance } from 'api';

export function UpdatePasswordPage() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (data) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosInstance.patch(
        `/auth/update-password/${localStorage.studyFiles_user_id}`,
        data,
        config,
      );
      console.log(res);
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
            Thay mật khẩu
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
                {...register('oldPassword', { required: true })}
              />
              {errors.oldPassword && <span>*</span>}
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
                {...register('newPassword', { required: true })}
              />
              {errors.newPassword && <span>*</span>}
              <Button
                type="submit"
                style={{ width: '130px' }}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Thay đổi
              </Button>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
