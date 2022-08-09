import { AppStateType } from 'reducers/store';
import { ComponentType } from 'reducers/modal-reducer';

export const selectIsOpen = (state:AppStateType):boolean => state.modals.isOpen;
export const selectNameComponent = (state:AppStateType):ComponentType => state.modals.nameComponent;
export const selectStatus = (state:AppStateType):boolean => state.app.status;
