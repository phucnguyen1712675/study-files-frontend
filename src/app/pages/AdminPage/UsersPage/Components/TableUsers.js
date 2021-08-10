import React, { useContext, useState } from 'react';

import { MDBDataTableV5 } from 'mdbreact';
import { Row, Col } from 'reactstrap';

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { Delete } from '@material-ui/icons';
import styles from '../../Components/style.module/style.module.css';
import AppContext from '../../../../AppContext';
import { axiosAdminInstance } from 'api/admin';
import { AccessToken } from 'api/auth';

export default function TableUsers() {
  const { store, dispatch } = useContext(AppContext);
  const [selectedId, setSelectedId] = useState('');

  const dataColumns = [
    {
      label: 'Id',
      field: 'id',
      width: 100,
    },
    {
      label: 'Name',
      field: 'name',
      width: 100,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Email',
      field: 'email',
      width: 100,
    },
    {
      label: 'Role',
      field: 'role',
      width: 100,
    },
    {
      label: 'Delete',
      field: 'delete',
      width: 50,
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClose = async function (bool) {
    setOpen(false);
    if (bool) {
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      try {
        const res = await axiosAdminInstance.delete(
          `/users/${selectedId}`,
          config,
        );
        if (res.status === 204) {
          dispatch({
            type: 'delete_task',
            payload: {
              userId: selectedId,
            },
          });
        } else {
          alert('Đã xảy ra lỗi ');
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
    }
  };

  const handleClickUsersDelete = function (id) {
    setSelectedId(id);
    setOpen(true);
  };

  const DataTableUI = function () {
    const dataRows = store.users.filter(
      item =>
        item.id !== localStorage.studyFiles_user_id &&
        (item.delete = (
          <Button
            style={{ width: '30px' }}
            onClick={() => handleClickUsersDelete(item.id)}
            variant="contained"
            color="secondary"
          >
            <Delete />
          </Button>
        )),
    );

    return (
      <MDBDataTableV5
        className={styles.table}
        hover
        entriesOptions={[10, 20, 25]}
        entries={10}
        pagesAmount={4}
        data={{ columns: dataColumns, rows: dataRows }}
      />
    );
  };

  return (
    <>
      <div
        style={{
          marginTop: '30px',
          borderRadius: '5px',
          backgroundColor: 'white',
          width: '85%',
          marginBottom: '30px',
          border: '1px solid #e3e3e3',
          boxShadow: '1px 1px 1px #dbdbdb',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row
            style={{
              width: '80%',
              marginTop: '50px',
            }}
          >
            <Col>
              <Typography component="h1" variant="h5" style={{ color: 'gray' }}>
                Tất cả học viên
              </Typography>
            </Col>
          </Row>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {DataTableUI()}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Xóa người dùng này ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa người dùng này không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
