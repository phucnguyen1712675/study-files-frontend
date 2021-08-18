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
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useStyles from '../../Components/style.module/UseStyles.js';
import { axiosAdminInstance } from 'api/admin';
import { AccessToken } from 'api/auth';
import AppContext from '../../../../AppContext';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  role: Yup.string().required('role is required'),
});

export default function AddUser() {
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
            'https://res.cloudinary.com/dqstbfcdu/image/upload/v1627294144/study-files-constants/avatar-1577909_640_jxa5hl.webp',
        };
      }
      const res = await axiosAdminInstance.post(`/users/`, data, config);
      if (res.status === 201) {
        dispatch({
          type: 'add_task',
          payload: res.data,
        });
        reset();
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
        Add new
      </Typography>
      <div className={classes.center}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {/* <TextField
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
          {errors.name && <span>*</span>} */}
          <div style={{ marginTop: '20px' }}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label="User Name"
              {...register('name')}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

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
              margin="normal"
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
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
            <Select
              margin="normal"
              variant="outlined"
              fullWidth
              defaultValue={''}
              labelId="demo-simple-select-outlined-label"
              {...register('role')}
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
            >
              <option
                style={{ marginBottom: '20px', marginLeft: '20px' }}
                value={''}
              ></option>
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
            <div className="invalid-feedback">{errors.role?.message}</div>
          </div>

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
  );
}
