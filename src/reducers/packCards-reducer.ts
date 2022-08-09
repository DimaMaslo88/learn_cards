import { packCardsAPI } from 'API/packCards-api';
import { handleServerError } from 'error-utils/error';
import { AppStateType, AppThunk } from './store';
import { setStatusAppAC } from './app-reducer';
import { setModalWindowAC } from './modal-reducer';

const SET_USER = 'cards/SET_USER';
const SET_CARD_PACK_ID = 'cards/SET_CARD_PACK_ID';
const ADD_LEARN_CARD = 'cards/ADD-LEARNING-CARDS';
const SET_GRADE = 'cards/SET-GRADE';
const SET_CARD_ID = 'cards/SET-CARD-ID';
const SORT_CARDS = 'cards/SORT-CARD';
const SET_PAGE_CARD = 'cards/SET-PAGE-CARD';
const SET_PAGE_COUNT_CARD = 'cards/SET-PAGE-COUNT-CARD';

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 5,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 10,
  packUserId: '',
  cardsPack_id: '',
  sortCards: '0grade',
  randomCardId: '',

};

export const packCardsReducer = (state: InitialStateType = initialState, action:
    CardsActionsType): InitialStateType => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.state };
    case SET_CARD_PACK_ID:
      return { ...state, cardsPack_id: action.cardsPackId };
    case 'cards/ADD-LEARNING-CARDS': {
      return { ...state, ...action.payload };
    }
    case 'cards/SET-CARD-ID': {
      return { ...state, randomCardId: action.cardId };
    }
    case 'cards/SET-PAGE-CARD': {
      return { ...state, page: action.page };
    }
    case 'cards/SET-GRADE': {
      return {
        ...state,
        cards: state.cards.map((card) => (card._id === action.payload.cardId ? {
          ...card,
          grade: action.payload.grade,
        } : card)),
      };
    }
    case 'cards/SET-PAGE-COUNT-CARD': {
      return { ...state, pageCount: action.pageCount };
    }
    case 'cards/SORT-CARD': {
      return { ...state, sortCards: action.sort };
    }
    default:
      return state;
  }
};

// actions
export const setCardsAC = (state: InitialStateType) => ({ type: SET_USER, state } as const);
export const setPackAC = (cardsPackId: string) => ({ type: SET_CARD_PACK_ID, cardsPackId } as const);
export const setIdCardAC = (cardId: string) => ({ type: SET_CARD_ID, cardId } as const);
export const setPageCardAC = (page: number) => ({ type: SET_PAGE_CARD, page } as const);
export const setPageCountCardAC = (pageCount: number) => ({ type: SET_PAGE_COUNT_CARD, pageCount } as const);
export const sortingCardsAC = (sort: string) => ({
  type: SORT_CARDS,
  sort,

} as const);
export const addLearningCardsAc = (question: string, answer: string, grade: number) => ({ // добавляю карточки для обучения

  type: ADD_LEARN_CARD,
  payload: {
    question,
    answer,
    grade,
  },

} as const);

export const setGradeAC = (grade: number, cardId: string) => ({
  type: SET_GRADE,
  payload: {
    grade,
    cardId,

  },

} as const);
// thunks
export const SetCardsTC = (): AppThunk => (dispatch, getState: () => AppStateType) => {
  dispatch(setStatusAppAC(true));

  packCardsAPI.getCards(getState().cards)
    .then((res) => {
      dispatch(setCardsAC(res.data));
    })
    .catch((error) => {
      handleServerError(error, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};

export const CreateLearningCardsTC = (question: string, answer: string, cardsPackId: string): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  packCardsAPI.addCard(question, answer, cardsPackId)
    .then((res) => {
      dispatch(SetCardsTC());
    })
    .catch((error) => {
      handleServerError(error, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
      dispatch(setModalWindowAC(false, 'addCard', '', ''));
    });
};

export const DeleteLearningCardsTC = (id: string): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  packCardsAPI.deleteCard(id)
    .then((res) => {
      dispatch(SetCardsTC());
    })
    .catch((error) => {
      handleServerError(error, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
      dispatch(setModalWindowAC(false, 'deleteCard', '', ''));
    });
};
export const UpdateLearningCardsTC = (_id: string, question: string): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  packCardsAPI.updateCard(_id, question)
    .then((res) => {
      dispatch(SetCardsTC());
    })
    .catch((error) => {
      handleServerError(error, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
      dispatch(setModalWindowAC(false, 'updateCard', '', ''));
    });
};
export const GradeCardsTC = (grade: number, cardId: string): AppThunk => (dispatch) => {
  dispatch(setStatusAppAC(true));
  packCardsAPI.createGrade(grade, cardId)
    .then((res) => {
      dispatch(setGradeAC(res.data.updatedGrade.grade, res.data.updatedGrade.card_id));
    })
    .catch((error) => {
      handleServerError(error, dispatch);
    })
    .finally(() => {
      dispatch(setStatusAppAC(false));
    });
};

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
    randomCardId: string
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
    | ReturnType<typeof setGradeAC>
    | ReturnType<typeof setIdCardAC>
    | ReturnType<typeof sortingCardsAC>
    | ReturnType<typeof setPageCardAC>
    | ReturnType<typeof setPageCountCardAC>
