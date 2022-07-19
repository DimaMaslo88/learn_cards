import {instance} from "./instance";
// import {NewPasswordType} from "../reducers/auth-reducer";


export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType>("auth/login", data)
    },
    register(data: RegisterParamsType) {
        return instance.post<RegisterResponseType>('auth/register', data)
    },
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    updateMe(data: UpdateMeType) {
        return instance.put<ResponseType<{ name: string, avatar: string }>>('auth/me', data)
    },
    logOut() {
        return instance.delete<ResponseDeleteType>('auth/me')
    },
    forgotLogin(data: ForgotLoginType) {
        return instance.post<ResponseDeleteType>('auth/forgot', data)
    },
    newPassword(data: NewPasswordType) {
        return instance.post<ResponseDeleteType>('auth/set-new-password', data)
    },


}


export type UpdateMeType = {
    name?: string
    avatar?: string
}


export type ForgotLoginType = {
    email: string
    from: string
    message: string
}

export type NewPasswordType = {
    password?: string
    resetPasswordToken?: string
}

export type ResponseDeleteType = {
    info: string

    error: string;
}
export type RegisterResponseType = {
    addedUser: {
        // не важные данные, просто для проверки
    } // чтобы посмотреть как выглядит созданный юзер

    error?: string;
}

export type RegisterParamsType = {
    email: string
    password: string

}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseType<D = {}> = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}
