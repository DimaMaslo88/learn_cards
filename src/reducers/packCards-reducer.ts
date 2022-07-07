import {packCardsAPI} from "../API/packCards-api";
import {handleServerError} from "../error-utils/error";
import {AppStateType, AppThunk} from "./store";
import {setStatusAppAC} from "./app-reducer";
import {setModalWindowAC} from "./modal-reducer";

const SET_USER = 'cards/SET_USER'
const SET_CARD_PACK_ID = 'cards/SET_CARD_PACK_ID'
const ADD_LEARN_CARD = "cards/ADD-LEARNING-CARDS"

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: '',
    cardsPack_id: '',
    sortCards: '0grade',
}

export const packCardsReducer = (state: InitialStateType = initialState, action:
    CardsActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return {...state, ...action.state}
        case SET_CARD_PACK_ID:
            return {...state, cardsPack_id: action.cardsPack_id,}
        case "cards/ADD-LEARNING-CARDS": {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

// actions
export const setCardsAC = (state: InitialStateType) => ({type: SET_USER, state} as const)
export const setPackAC = (cardsPack_id: string) => ({type: SET_CARD_PACK_ID, cardsPack_id} as const)
export const addLearningCardsAc = (question: string, answer: string, grade: number) => { // добавляю карточки для обучения
    return {
        type: ADD_LEARN_CARD,
        payload: {
            question,
            answer,
            grade
        }

    } as const
}


// thunks
export const SetCardsTC = (): AppThunk =>
    (dispatch, getState: () => AppStateType) => {
        dispatch(setStatusAppAC(true))

        packCardsAPI.getCards(getState().cards)
            .then(res => {

                dispatch(setCardsAC(res.data))
            })
            .catch(error => {
                handleServerError(error, dispatch)

            })
            .finally(() => {
                dispatch(setStatusAppAC(false))
            })
    }

export const CreateLearningCardsTC = (question: string, answer: string, cardsPack_id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    packCardsAPI.addCard(question, answer, cardsPack_id)
        .then(res => {
            dispatch(SetCardsTC())
        })
        .catch(error => {
            handleServerError(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
            dispatch(setModalWindowAC(false, 'addCard', '',''))
        })
}


export const DeleteLearningCardsTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    packCardsAPI.deleteCard(id)
        .then(res => {
            dispatch(SetCardsTC())
        })
        .catch(error => {
            handleServerError(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
            dispatch(setModalWindowAC(false, 'deleteCard', '',''))
        })
}
export const UpdateLearningCardsTC = (_id: string, question: string): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    packCardsAPI.updateCard(_id, question)
        .then(res => {
            dispatch(SetCardsTC())
        })
        .catch(error => {
            handleServerError(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
            dispatch(setModalWindowAC(false, 'updateCard', '',''))
        })
}


// types
export type InitialStateType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    cardsPack_id: string
    sortCards: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id?: string
    grade: number
    shots?: number
    user_id?: string
    created?: string
    updated: string
    _id: string
}
export type CardsActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setPackAC>
    | ReturnType<typeof addLearningCardsAc>