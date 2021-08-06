import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showLoadingSwal = () => {
  return MySwal.fire({
    title: 'Action in progress..',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      MySwal.showLoading();
    },
  });
};

export const closeSwal = () => MySwal.close();

export const showSuccessSwal = (text?: string) => {
  return MySwal.fire({
    title: 'Processing complete!',
    icon: 'success',
    text,
    timer: 1000,
    showConfirmButton: false,
  });
};

export const showWarningSwal = (text: string) => {
  return MySwal.fire({
    title: 'Something wrong!',
    icon: 'warning',
    text,
  });
};

export const showErrorSwal = (text: string) => {
  return MySwal.fire({
    title: 'Failed!',
    icon: 'error',
    text,
  });
};
