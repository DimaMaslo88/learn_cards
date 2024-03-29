import { AppStateType } from 'reducers/store';
import { CardType } from 'reducers/packCards-reducer';
import { CardPacksType } from 'API/cards-api';

export const selectIsLoggedIn = (state: AppStateType): boolean => state.auth.isLoggedIn;
export const selectIsRegisterIn = (state: AppStateType): boolean => state.auth.isRegisterIn;
export const selectCards = (state: AppStateType): CardType[] => state.cards.cards;
export const selectPageCount = (state: AppStateType): number => state.cards.pageCount;
export const selectSort = (state: AppStateType): string => state.cards.sortCards;
export const selectPackId = (state: AppStateType): string => state.cards.cardsPack_id;
export const selectUserId = (state: AppStateType): string => state.cardPacks.params.user_id;
export const selectPackPage = (state: AppStateType): number => state.cardPacks.page;
export const selectTotalCount = (state: AppStateType): number => state.cards.cardsTotalCount;
export const selectCardsPack = (state: AppStateType): CardPacksType[] => state.cardPacks.cardPacks;
export const selectPackPageCount = (state: AppStateType): number => state.cardPacks.pageCount;
export const selectPackTotalCount = (state: AppStateType): number => state.cardPacks.cardPacksTotalCount;
export const selectPackSort = (state: AppStateType): string => state.cardPacks.params.sortPacks;
export const selectPackName = (state: AppStateType): string => state.cardPacks.params.packName;
export const selectUserName = (state: AppStateType): string => state.auth.profile.name;
export const selectUserEmail = (state: AppStateType): string => state.auth.profile.email;
export const selectUserAva = (state: AppStateType): string | undefined => state.auth.profile.avatar;
export const selectError = (state: AppStateType): string | null => state.app.error;
