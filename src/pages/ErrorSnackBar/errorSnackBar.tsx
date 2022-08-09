import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setErrorAppAC } from 'reducers/app-reducer';
import { AppStateType } from 'reducers/store';

const Alert = forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export function ErrorSnackbar():React.ReactElement {
  const dispatch = useDispatch();
  const error = useSelector<AppStateType, string | null>((state) => state.app.error);

  const handleClose = (event: any, reason?: string):void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorAppAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
