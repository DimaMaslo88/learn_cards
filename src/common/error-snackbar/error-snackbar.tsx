import {useDispatch, useSelector} from 'react-redux';
import s from './error-snackbar.module.css'
import {useEffect} from 'react';
import {AppStateType} from "../../reducers/store";
import {setLoggedInAC} from "../../reducers/auth-reducer";
import {setErrorAppAC} from "../../reducers/app-reducer";

export const ErrorSnackbar = () => {
    const error = useSelector<AppStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setErrorAppAC(''))
                // dispatch(setLoggedInAC(false))
            }, 4500)
            return () => clearTimeout(timer)
        }
    }, [dispatch, error])

    const handleClose = () => {
        dispatch(setErrorAppAC(''))
        dispatch(setLoggedInAC(false))
    }

    return (
        <>
            {error && <div onClick={handleClose} className={s.div}>{error}</div>}
        </>
    )
}