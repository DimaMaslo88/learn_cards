import React from 'react';
import {useFormik} from "formik";
import {LoginTC, ResetPasswordTC, SetNewPasswordTC} from "../../reducers/auth-reducer";

import Input from "../../common/input/Input";

import Button from "../../common/button/Button";
import {useAppDispatch} from "../../reducers/store";
import {useParams} from "react-router-dom";


type FormikErrorType = {
    password?: string
    resetPasswordToken?: string
}

const RestorePassword = () => {

    const dispatch = useAppDispatch()
    const {token}=useParams<string>()

    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token,

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.resetPasswordToken) {
                errors.resetPasswordToken = "Invalid Token"
            } else if (values.password.length < 4) {
                errors.password = 'To small password';
            }else if(!values.password){
                errors.password = "Password is empty"
            }
            return errors;

        },
        onSubmit: (values) => {
            dispatch(SetNewPasswordTC(values));
            formik.resetForm()
        },
    })

    return <form onSubmit={formik.handleSubmit}>
        <div>

            <h2>Restore your password</h2>
            <Input placeholder={'Enter your Password'}
                // newPassword
                   {...formik.getFieldProps("password")}

            />
        </div>
        {formik.touched.password &&
            formik.errors.password &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        {formik.touched.resetPasswordToken &&
            formik.errors.resetPasswordToken &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        <p>Enter your Email</p>
        <p>New password will be sent on your Email</p>
        <Button>
            Send
        </Button>
    </form>
};

export default RestorePassword;