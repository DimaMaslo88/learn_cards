import {
  authApi,
  ForgotLoginType,
  LoginParamsType,
  RegisterParamsType,
  UpdateMeType,
  NewPasswordType,
} from 'API/user-api';
import { handleServerError } from 'error-utils/error';
import { AppThunk } from './store';

import { setStatusAppAC } from './app-reducer';

export type ProfileType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
// количество колод

    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,

    error?: string
}

const initialState = {
  isLoggedIn: false,
  isRegisterIn: false,
  isInitializeIn: false,
  sendSuccess: false,
  sendPassword: false,
  profile: {
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKS48ilmDRBg8dQUfQLAuHJolMtiVxpnzVT8tRbTxdUuSQDmVMr5NRrn_pV0kgyqr7cU&usqp=CAU',
  } as ProfileType,
};
type InitialStateType = {
    isLoggedIn: boolean,
    isRegisterIn: boolean,
    isInitializeIn: boolean,
    sendSuccess: boolean
    sendPassword: boolean
    profile: ProfileType
}
type GeneralType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType
    | SetLoginDataACType
    | UpdateUserParamsType
    | ForgotPasswordType
    | SetNewPasswordType

export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-LOGGED-IN': {
      return { ...state, isLoggedIn: action.isLoggedIn };
    }
    case 'register/SET-REGISTER-IN': {
      return { ...state, isRegisterIn: action.isRegisterIn };
    }
    case 'login/SET-INITIALIZE-IN': {
      return { ...state, isInitializeIn: action.isInitializeIn };
    }
    case 'login/SET-LOGIN-DATA': {
      return { ...state, profile: action.profile };
    }
    case 'login/UPDATE-USER-PARAMS': {
      return { ...state, profile: { ...state.profile, name: action.name, avatar: action.avatar } };
    }
    case 'login/FORGOT-PASSWORD': {
      return { ...state, sendSuccess: action.sendSuccess };
    }
    case 'login/NEW-PASSWORD': {
      return { ...state, sendPassword: action.sendPassword };
    }

    default:
      return state;
  }
};

export type SetLoggedInType = ReturnType<typeof setLoggedInAC>

export const setLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-LOGGED-IN',
  isLoggedIn,
} as const);
export type SetInitializeType = ReturnType<typeof setInitializeAC>
export const setInitializeAC = (isInitializeIn: boolean) => ({
  type: 'login/SET-INITIALIZE-IN',
  isInitializeIn,
} as const);

export type SetRegisterInType = ReturnType<typeof setRegisterInAC>
export const setRegisterInAC = (isRegisterIn: boolean) => ({
  type: 'register/SET-REGISTER-IN',
  isRegisterIn,
} as const);

export type SetLoginDataACType = ReturnType<typeof setLoginDataAC>
export const setLoginDataAC = (profile: ProfileType) => ({
  type: 'login/SET-LOGIN-DATA',

  profile,

} as const);

export type UpdateUserParamsType = ReturnType<typeof updateUserParamsAC>
export const updateUserParamsAC = (name: string, avatar: string) => ({
  type: 'login/UPDATE-USER-PARAMS',
  name,
  avatar,
} as const);

export type ForgotPasswordType = ReturnType<typeof forgotPasswordAC>
export const forgotPasswordAC = (sendSuccess: boolean) => ({
  type: 'login/FORGOT-PASSWORD',
  sendSuccess,
} as const);

export type SetNewPasswordType = ReturnType<typeof setNewPasswordAC>
export const setNewPasswordAC = (sendPassword: boolean) => ({
  type: 'login/NEW-PASSWORD',
  sendPassword,
} as const);

export const LoginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true)); // статус выполнения для крутилки
  authApi.login(data)
    .then((res) => {
      dispatch(setLoggedInAC(true)); // диспатчим actionCreator для логинизации
      dispatch(setLoginDataAC(res.data));// данные пользователя
      dispatch(setStatusAppAC(false));// status
    })
    .catch((err) => {
      handleServerError(err, dispatch);
      // handleServerError(err,dispatch)
      // const error = e.response
      //     ? e.response.data.error
      //     : (e.message + ', more details in the console');
      // console.log('Error: ', {...e})
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};
export const LogOutTC = (): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  authApi.logOut()
    .then((res) => {
      dispatch(setLoggedInAC(false));
      dispatch(setStatusAppAC(true));
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};
export const RegisterTC = (data: RegisterParamsType): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  authApi.register(data)
    .then((res) => {
      dispatch(setStatusAppAC(true));
      dispatch(setRegisterInAC(true));
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};
export const InitializeTC = (): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  authApi.me()
    .then((res) => {
      dispatch(setLoggedInAC(true));
      dispatch(setStatusAppAC(true));
      dispatch(setLoginDataAC(res.data));
      // handleServerError(res.data.error,dispatch)
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setInitializeAC(true));
      dispatch(setStatusAppAC(false));
    });
};

export const UpdateUserTC = (data: UpdateMeType): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  authApi.updateMe(data)
    .then((res) => {
      dispatch(updateUserParamsAC(res.data.name, res.data.avatar));
      dispatch(InitializeTC());
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};

export const ResetPasswordTC = (data: ForgotLoginType): AppThunk => (dispatch) => { /* ----- */
  dispatch(setStatusAppAC(true));
  authApi.forgotLogin(data)
    .then((res) => {
      dispatch(forgotPasswordAC(true));
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};

export const SetNewPasswordTC = (data: NewPasswordType): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  authApi.newPassword(data)
    .then((res) => {
      dispatch(setNewPasswordAC(true));
    })
    .catch((err) => {
      handleServerError(err, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};
