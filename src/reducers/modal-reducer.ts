const initialState = {
    isOpen: false,
    nameComponent: null,
    id: '',
    question: ''
}
export type InitialStateType = {
    isOpen: boolean
    nameComponent: ComponentType
    id: string
    question:string
}

export type ComponentType = 'add'
    | 'delete'
    | 'update'
    | 'addCard'
    | 'deleteCard'
    | 'updateCard'
    | 'learnCards'
    | null

export type ModalActionType = SetModalWindowType

export const modalReducer = (state: InitialStateType = initialState, action: ModalActionType): InitialStateType => {
    switch (action.type) {
        case "SET-MODAL-WINDOW": {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}


export type SetModalWindowType = ReturnType<typeof setModalWindowAC>
export const setModalWindowAC = (isOpen: boolean, nameComponent: ComponentType, id: string,question:string) => {
    return {
        type: "SET-MODAL-WINDOW",
        payload: {
            isOpen,
            nameComponent,
            id,
            question
        }
    } as const
}