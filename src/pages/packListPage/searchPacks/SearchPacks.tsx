import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'reducers/store';
import { searchByNameAC } from 'reducers/cards-reducer';

import { setModalWindowAC } from 'reducers/modal-reducer';
import { ModalWindow } from 'modal/Modal';
import { ReturnComponentType } from 'types';
import Button from '../../../common/button/Button';
import style from './SearchPacks.module.css';

const SearchPacks = ():ReturnComponentType => {
  const dispatch = useAppDispatch();
  const value = useSelector<AppStateType, string>((state) => state.cardPacks.params.packName);
  const searchNameHandler = (e: ChangeEvent<HTMLInputElement>):void => {
    dispatch(searchByNameAC(e.currentTarget.value));
  };

  const openModelWindowHandler = ():void => {
    dispatch(setModalWindowAC(true, 'add', '', ''));
  };

  return (

    <div className={style.component}>
      <input
        className={style.input}
        placeholder="search packs"
        value={value}
        onChange={searchNameHandler}
      />

      <Button onClick={openModelWindowHandler}>Add Pack</Button>

      <ModalWindow />
    </div>

  );
};

export default SearchPacks;
