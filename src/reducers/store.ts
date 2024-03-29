import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import {
  authReducer, ForgotPasswordType,
  SetInitializeType,
  SetLoggedInType,
  SetLoginDataACType, SetNewPasswordType,
  SetRegisterInType,
  UpdateUserParamsType,
} from './auth-reducer';
import { appReducer, SetErrorAppType, SetStatusAppType } from './app-reducer';
import {
  AddCardsType,
  cardsReducer, DeletePackType,
  IdFilterPackType, SearchByNameType,

  SetCardsType, SetCoverType,
  SetPageCountType,
  SetPageType, SortingPackType, UpdatePackType,
} from './cards-reducer';

import { CardsActionsType, packCardsReducer } from './packCards-reducer';
import { modalReducer, SetModalWindowType } from './modal-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cardPacks: cardsReducer,
  cards: packCardsReducer,
  modals: modalReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, undefined, AppActionsType>

export const useAppDispatch = ():AppDispatch => useDispatch<AppDispatch>();

export type AppDispatch = ThunkDispatch<AppStateType, undefined, AppActionsType>;

export type AppActionsType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType
    | SetStatusAppType
    | SetErrorAppType
    | SetLoginDataACType
    | UpdateUserParamsType
    | ForgotPasswordType
    | SetCardsType
    | AddCardsType
    | SetPageType
    | SetPageCountType
    | IdFilterPackType
    | DeletePackType
    | UpdatePackType
    | SortingPackType
    | SearchByNameType
    | SetModalWindowType
    | CardsActionsType
    | SetNewPasswordType
    | SetCoverType
export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
