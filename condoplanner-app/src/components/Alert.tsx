import React from 'react';
import { useAlertStore } from '../stores/alert.store';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert: React.FC = () => {
  const { message, type, visible, hideAlert } = useAlertStore();

  return (
    <Snackbar
      open={visible}
      autoHideDuration={3000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={hideAlert} severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;