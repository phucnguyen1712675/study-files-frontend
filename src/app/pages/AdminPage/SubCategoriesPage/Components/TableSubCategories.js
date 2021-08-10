import React, { useContext, useState, useEffect } from 'react';

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
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import styles from '../../Components/style.module/style.module.css';
import AppContext from '../../../../AppContext';
import { axiosAdminInstance } from 'api/admin';
import { AccessToken } from 'api/auth';

export default function TableMainCategories() {
  const { store, dispatch } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(function () {
    async function loadTasks() {
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAdminInstance.get(`/categories`, config);
      setCategories(res.data);
    }
    loadTasks();
  }, []);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);

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
          `/subCategories/${selectedId}`,
          config,
        );
        if (res.status === 204) {
          dispatch({
            type: 'delete_task',
            payload: {
              subCategoryId: selectedId,
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

  const handleClickCategoryDetail = function (item) {
    setSelectedId(item.id);
    setName(item.name);
    setCategoryId(item.category.id);
    setOpenDetail(true);
  };

  const handleCloseDetailDialog = async function (bool) {
    if (bool) {
      try {
        await AccessToken();
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
          },
        };
        const res = await axiosAdminInstance.patch(
          `/subCategories/${selectedId}`,
          { name: name, categoryId: categoryId },
          config,
        );
        if (res.status === 200) {
          dispatch({
            type: 'update_task',
            payload: {
              subCategoryId: selectedId,
              subCategory: res.data,
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
    setOpenDetail(false);
  };

  const DataTableUI = function () {
    const dataRows = Array.from(store.subCategories, item => {
      item.categoryName = item.category.name;
      item.delete = (
        <Button
          style={{ width: '30px' }}
          onClick={() => handleClickCategoryDelete(item.id)}
          variant="contained"
          color="secondary"
        >
          <Delete />
        </Button>
      );
      item.detail = (
        <Button
          style={{ width: '30px' }}
          onClick={() => handleClickCategoryDetail(item)}
          variant="contained"
          color="primary"
        >
          <Edit />
        </Button>
      );
      return item;
    });

    const dataColumns = [
      {
        label: 'Id',
        field: 'id',
        width: 100,
      },
      {
        label: 'Sub category',
        field: 'name',
        width: 100,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: `Main catetory`,
        field: `categoryName`,
        width: 100,
      },
      {
        label: 'Subscriber',
        field: 'subscriberNumber',
        width: 100,
      },
      {
        label: 'Delete',
        field: 'delete',
        width: 50,
      },
      {
        label: 'Edit',
        field: 'detail',
        width: 50,
      },
    ];

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
                Tất cả danh mục phụ
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
        <DialogTitle id="alert-dialog-title">
          {'Xóa danh mục này này ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa danh mục này không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDeleteDialog(false)}
            color="primary"
          >
            Hủy
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

      <Dialog
        open={openDetail}
        onClose={() => handleCloseDetailDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xem chi tiết'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            đổi tên danh mục này ?
          </DialogContentText>
          <TextField
            required
            style={{ width: '100%', marginBottom: '20px' }}
            id="itemNameTextField"
            label="Required"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Select
            variant="outlined"
            fullWidth
            value={categoryId}
            onChange={e => {
              // const name = e.currentTarget.getAttribute('name');
              // const id = e.currentTarget.getAttribute('data-value');
              // setCategoryId({
              //   ...categoryId,
              //   name: name,
              //   id: id,
              // });
              setCategoryId(e.target.value);
            }}
            required
          >
            {categories.map(item => {
              return (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  name={item.name}
                  style={{ marginBottom: '20px', marginLeft: '20px' }}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDetailDialog(false)}
            color="primary"
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleCloseDetailDialog(true)}
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
