import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { LoginTC } from 'reducers/auth-reducer';
import { useAppDispatch } from 'reducers/store';
import { selectIsLoggedIn } from 'reducers/selectors/Selectors';
import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';

import Input from '../../common/input/Input';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

function Login():React.ReactElement {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password must not be a null';
      } else if (values.password.length < 4) {
        errors.password = 'To small password';
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(LoginTC(values));
      formik.resetForm();
    },
  });
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>

        <h2>Login</h2>

        <Input
          placeholder="email"
          {...formik.getFieldProps('email')}
        />
      </div>
      <div>
        {formik.touched.email
            && formik.errors.email
            && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

        <Input
          placeholder="password"
          {...formik.getFieldProps('password')}
        />
      </div>
      {formik.touched.password
        && formik.errors.password
        && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
      <Checkbox
        checked={formik.values.rememberMe}
        {...formik.getFieldProps('rememberMe')}
      >
        Remember Me
      </Checkbox>
      <Button>
        Login
      </Button>
      <NavLink to="/new-password">Forgot Password?</NavLink>
    </form>
  );
}

export default Login;
