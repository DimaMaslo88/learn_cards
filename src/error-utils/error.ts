import { Dispatch } from 'redux';
import { setErrorAppAC, SetErrorAppType } from 'reducers/app-reducer';

export const handleServerError = (error:any, dispatch: Dispatch<SetErrorAppType>) => {
  dispatch(setErrorAppAC(error ? error.response?.data.error : ' Error`s details in the console'));
};
