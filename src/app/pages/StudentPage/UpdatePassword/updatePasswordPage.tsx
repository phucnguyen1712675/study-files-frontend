import { Button, Container, TextField, Typography } from '@material-ui/core';
import Footer from 'app/components/Footer/Footer';
import Topbar from 'app/components/Topbar/Topbar';
import styles from '../components/style.module.css';
import useStyles from 'app/pages/AdminPage/Components/style.module/UseStyles';
import { useForm } from 'react-hook-form';
import { axiosAuthInstance, AccessToken } from 'api/auth';

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
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAuthInstance.patch(
        `/update-password/${localStorage.studyFiles_user_id}`,
        data,
        config,
      );
      if (res.status === 200) {
        reset({});
        alert('Updated !');
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

      <div className={styles.wrapper}>
        <Container
          component="main"
          className={classes.paper}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <Typography
            style={{
              marginTop: '20px',
              marginBottom: '10px',
              marginRight: 'auto',
              color: '#525252',
              fontWeight: 'bolder',
              fontSize: 25,
            }}
          >
            Update password
          </Typography>
          <form
            className={classes.form}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
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
              style={{ width: '130px', marginLeft: 'auto' }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Container>
      </div>
      <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
        <Footer />
      </div>
    </>
  );
}
