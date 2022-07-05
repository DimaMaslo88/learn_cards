import React from 'react';
import {useFormik} from "formik";
import {LoginTC, ResetPasswordTC, SetNewPasswordTC} from "../../reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import Input from "../../common/input/Input";
import Checkbox from "../../common/checkbox/Checkbox";
import Button from "../../common/button/Button";
import {useAppDispatch} from "../../reducers/store";
import {useParams} from "react-router-dom"

type FormikErrorType = {
    email?: string
}

const RestorePassword = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: '',
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "email must not be a null"
            } else if (values.email.length < 4) {
                errors.email = 'To small email';
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
            <Input placeholder={'Enter your Email'}
                // newPassword
                   {...formik.getFieldProps("email")}

            />
        </div>
        {formik.touched.email &&
            formik.errors.email &&
            <div style={{color: 'red'}}>{formik.errors.email}</div>}
        <p>Enter your Email</p>
        <p>New password will be sent on your Email</p>
        <Button>
            Send
        </Button>
    </form>
};

export default RestorePassword;