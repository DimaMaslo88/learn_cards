import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {InitializeTC, LoginTC, LogOutTC} from "../../reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";
import style from "./Profile.module.css"
import {InputTypeFilesAvatar} from "../../components/inputTypeFileAvatar/InputTypeFilesAvatar";

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppStateType, string>(state => state.auth.profile.name)
    const email = useSelector<AppStateType, string>(state => state.auth.profile.email)
    const ava = useSelector<AppStateType, string | undefined>(state => state.auth.profile.avatar)
    useEffect(() => {
        if (isLoggedIn)
            dispatch(InitializeTC())
    }, [])


    const formik = useFormik({

        initialValues: {
            email: email,
            nickName: name
        },

        onSubmit: values => {
            dispatch(LogOutTC());
            formik.resetForm()
        },
    })


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <form onSubmit={formik.handleSubmit} className={style.form}>

        <div  className={style.profile}>

            <h2>My Profile</h2>
            <div className={style.avatar}>
                <InputTypeFilesAvatar/>
              {/*<img*/}
              {/*     src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKS48ilmDRBg8dQUfQLAuHJolMtiVxpnzVT8tRbTxdUuSQDmVMr5NRrn_pV0kgyqr7cU&usqp=CAU"}/>*/}
            </div>
            NickName: <Input placeholder={'Nickname'}
                             {...formik.getFieldProps("nickName")}

        />


        Email: <Input
        placeholder={'email'} disabled={true} className={style.disabled}
        {...formik.getFieldProps("email")}


    />
            <div className={style.button}>

                <Button>LogOut</Button>

            </div>
        </div>

    </form>
};

export default Profile;