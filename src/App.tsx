import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { InitializeTC } from 'reducers/auth-reducer';
import { AppStateType, useAppDispatch } from 'reducers/store';
import { ErrorSnackbar } from 'pages/ErrorSnackBar/errorSnackBar';
import s from './App.module.css';
import Header from './header/Header';
import Pages from './pages/Pages';

export const App:FC = () => {
  const dispatch = useAppDispatch();
  const isInitializeIn = useSelector<AppStateType, boolean>((state) => state.auth.isInitializeIn);
  const status = useSelector<AppStateType, boolean>((state) => state.app.status);

  useEffect(() => {
    dispatch(InitializeTC());
  }, []);
  if (!isInitializeIn) {
    return (
      <div
        style={{
          position: 'fixed', top: '30%', textAlign: 'center', width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (

    <div className={s.app}>

      <Header />
      <Pages />
      <ErrorSnackbar />
      {status && <CircularProgress />}

    </div>
  );
};
