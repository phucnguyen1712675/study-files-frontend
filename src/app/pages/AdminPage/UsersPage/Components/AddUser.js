import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  InputLabel,
} from '@material-ui/core/';
import useStyles from '../../Components/style.module/UseStyles.js';
import { axiosAdminInstance } from 'api/admin';
import { AccessToken } from 'api/auth';
import AppContext from '../../../../AppContext';

export default function AddUser() {
  const { dispatch } = useContext(AppContext);

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
      if (data.role === 'teacher') {
        data = {
          ...data,
          avatar:
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
        };
      }
      const res = await axiosAdminInstance.post(`/users/`, data, config);
      if (res.status === 201) {
        dispatch({
          type: 'add_task',
          payload: res.data,
        });
        reset({});
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Container component="main" className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.headerText}>
        Thêm mới
      </Typography>
      <div className={classes.center}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="user name"
            autoComplete="name"
            autoFocus
            {...register('name', { required: true })}
          />
          {errors.name && <span>*</span>}
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
          <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            labelId="demo-simple-select-outlined-label"
            label="Role"
            id="role"
            required
            {...register('role', { required: true })}
          >
            <option aria-label="None" value="" />
            <option
              value="student"
              style={{ marginBottom: '20px', marginLeft: '20px' }}
            >
              Student
            </option>
            <option
              value="teacher"
              style={{ marginBottom: '20px', marginLeft: '20px' }}
            >
              Teacher
            </option>
            <option
              value="admin"
              style={{ marginBottom: '20px', marginLeft: '20px' }}
            >
              Admin
            </option>
          </Select>
          {errors.role && <span>*</span>}

          <Button
            type="submit"
            style={{ width: '130px' }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Thêm mới
          </Button>
        </form>
      </div>
    </Container>
  );
}
