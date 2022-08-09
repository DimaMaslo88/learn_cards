import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  InitializeTC, LogOutTC,
} from 'reducers/auth-reducer';
import { useAppDispatch } from 'reducers/store';
import {
  InputTypeFilesAvatar,
} from 'components/inputTypeFileAvatar/InputTypeFilesAvatar';
import {
  selectIsLoggedIn, selectUserAva, selectUserEmail, selectUserName,
} from 'reducers/selectors/Selectors';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import style from './Profile.module.css';

function Profile():React.ReactElement {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const ava = useSelector(selectUserAva);
  useEffect(() => {
    if (isLoggedIn) { dispatch(InitializeTC()); }
  }, []);

  const formik = useFormik({

    initialValues: {
      email,
      nickName: name,
    },

    onSubmit: (values) => {
      dispatch(LogOutTC());
      formik.resetForm();
    },
  });
  // const onChangeNameHandler=(e:ChangeEvent<HTMLInputElement>)=>{       // fix!!!!!!!!!!!!
  //         dispatch(UpdateUserTC(e.currentTarget.value))
  // }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>

      <div className={style.profile}>

        <h2>My Profile</h2>
        <div className={style.avatar}>
          <InputTypeFilesAvatar />

        </div>
        NickName:
        {' '}
        <Input
          placeholder="Nickname"
          {...formik.getFieldProps('nickName')}
        />

        Email:
        {' '}
        <Input
          placeholder="email"
          disabled
          className={style.disabled}
          {...formik.getFieldProps('email')}
        />
        <div className={style.button}>

          <Button>LogOut</Button>

        </div>
      </div>

    </form>
  );
}

export default Profile;
