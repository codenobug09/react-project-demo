import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './alert.css';

function AlertComponent({
  type,
  notification,
  closeToast,
  message,
}: {
  type: 'success' | 'info' | 'warning' | 'error';
  notification: boolean;
  closeToast: Function;
  message?: string;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    closeToast(false);
  };
  return (
    <>
      <div>
        {notification ? (
          <>
            <Snackbar
              open={notification}
              autoHideDuration={7000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
              >
                <div className="text">{message || transformText(type)}</div>
              </Alert>
            </Snackbar>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

function transformText(value: string): string {
  switch (value) {
    case 'success':
      return 'Thành công!';
    case 'info':
      return 'Thông báo!';
    case 'warning':
      return 'Cảnh báo!';
    case 'error':
      return 'Lỗi!';
    default:
      return '';
  }
}

export default AlertComponent;
