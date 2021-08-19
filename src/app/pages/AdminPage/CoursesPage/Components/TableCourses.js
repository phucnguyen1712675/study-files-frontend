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
import { useHistory } from 'react-router-dom';
import { Visibility, Delete } from '@material-ui/icons';

import styles from '../../Components/style.module/style.module.css';
import AppContext from '../../../../AppContext';
import { axiosAdminInstance } from 'api/admin';
import { AccessToken } from 'api/auth';

export default function TableCourses() {
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [selectedId, setSelectedId] = useState('');

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickCategoryDelete = function (id) {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = async function (bool) {
    if (bool) {
      try {
        await AccessToken();
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
          },
        };
        const res = await axiosAdminInstance.delete(
          `/courses/${selectedId}`,
          config,
        );
        if (res.status === 204) {
          dispatch({
            type: 'delete_task',
            payload: {
              courseId: selectedId,
            },
          });
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    }
    setOpenDelete(false);
  };

  const handleClickCourseDetail = async function (item) {
    const course = { ...item };
    delete course.subCategoryName;
    delete course.teacherName;
    delete course.delete;
    delete course.detail;
    const courseName = course.name.replaceAll(' ', '-');
    history.push(`/course/${courseName}`, { course: course });
  };

  const DataTableUI = function () {
    const dataRows = Array.from(store.courses, item => {
      item.subCategoryName = item.subCategory.name;
      item.teacherName = item.teacher.name;
      item.delete = (
        <Button
          onClick={() => handleClickCategoryDelete(item.id)}
          variant="contained"
          color="secondary"
        >
          <Delete style={{ fontSize: 20, padding: '0px' }} />
        </Button>
      );
      item.detail = (
        <Button
          onClick={() => handleClickCourseDetail(item)}
          variant="contained"
          color="primary"
        >
          <Visibility style={{ fontSize: 20, padding: '0px' }} />
        </Button>
      );
      return item;
    });

    const dataColumns = [
      {
        label: 'Id',
        field: 'id',
        width: 150,
      },
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: `Category`,
        field: `subCategoryName`,
        width: 150,
      },
      {
        label: `Teacher`,
        field: `teacherName`,
        width: 150,
      },
      {
        label: 'Subs',
        field: 'subscriberNumber',
        width: 50,
      },
      {
        label: 'View',
        field: 'view',
        width: 50,
      },
      {
        label: 'Del',
        field: 'delete',
      },
      {
        label: 'Det',
        field: 'detail',
      },
    ];

    return (
      <MDBDataTableV5
        className={styles.table2}
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
          width: '90%',
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
              width: '95%',
              marginTop: '50px',
            }}
          >
            <Col>
              <Typography component="h1" variant="h5" style={{ color: 'gray' }}>
                All courses
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
        open={openDelete}
        onClose={() => handleCloseDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete course ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this course ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDeleteDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCloseDeleteDialog(true)}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
