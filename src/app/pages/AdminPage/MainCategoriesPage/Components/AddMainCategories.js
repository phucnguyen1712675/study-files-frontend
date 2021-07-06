import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container } from '@material-ui/core/';
import useStyles from '../../Components/style.module/UseStyles.js';
import { axiosAdminInstance } from 'api/admin';
import AppContext from '../../../../AppContext';

export default function AddMainCategory() {
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
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAdminInstance.post(`/categories/`, data, config);
      if (res.status === 201) {
        dispatch({
          type: 'add_task',
          payload: res.data,
        });
        reset({});
      } else {
        alert(res.data);
        console.log(res);
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
            label="main category name"
            autoComplete="name"
            autoFocus
            {...register('name', { required: true })}
          />
          {errors.name && <span>*</span>}
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
