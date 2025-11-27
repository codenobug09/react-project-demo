import './dialog.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function DialogComponent({
  isShowDialog,
  showDialog,
  selection,
}: {
  isShowDialog: boolean;
  showDialog: Function;
  selection?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(isShowDialog);
    }, 0);
  });

  const hanndleDelete = () => {
    if (open) {
      showDialog('delete');
    }
  };

  const handleClose = () => {
    if (open) {
      showDialog('cancel');
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {selection ? (
          <DialogTitle id="responsive-dialog-title">{'Cảnh báo!'}</DialogTitle>
        ) : (
          <DialogTitle id="responsive-dialog-title">
            {'Xóa nhân sự này ?'}
          </DialogTitle>
        )}
        <DialogContent>
          {selection ? (
            <DialogContentText>
              {
                'Bạn phải chọn ít nhất 1 bản ghi để thực hiện thao tác xóa nhiều !'
              }
            </DialogContentText>
          ) : (
            <DialogContentText>
              {
                'Dữ liệu này sẽ bị xóa khỏi database và không thể khôi phục ? Bạn muốn tiếp tục xóa chứ ?'
              }
            </DialogContentText>
          )}
        </DialogContent>
        {selection ? (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Đóng
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Hủy
            </Button>
            <Button onClick={hanndleDelete} autoFocus>
              Xóa
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
export default DialogComponent;
