import React, {forwardRef} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {setErrorAppAC} from "../../reducers/app-reducer";
import {AppStateType} from "../../reducers/store";

import Snackbar from "@mui/material/Snackbar"
import MuiAlert, {AlertProps} from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const error = useSelector<AppStateType, string | null>(state => state.app.error)



    const handleClose = (event: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAppAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );

}
