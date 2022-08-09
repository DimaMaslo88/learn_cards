import React, { useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useAppDispatch } from 'reducers/store';
import { sortingPackAC } from 'reducers/cards-reducer';
import style from '../PackListContainer.module.css';

import FilterForId from '../../packListPage/filterForId/FilterForId';
import SearchPacks from '../../packListPage/searchPacks/SearchPacks';

function HeaderPack():React.ReactElement {
  const dispatch = useAppDispatch();
  const [push, setPush] = useState<boolean>(false);
  const [pushCardCount, setPushCardCount] = useState<boolean>(false);
  const [pushUpdate, setPushUpdate] = useState<boolean>(false);

  const sortHandlerName = (value: string):void => {
    dispatch(sortingPackAC(value));
    setPush(!push);
  };
  const sortHandlerCounter = (value: string):void => {
    dispatch(sortingPackAC(value));
    setPushCardCount(!pushCardCount);
  };
  const sortHandlerUpdate = (value: string):void => {
    dispatch(sortingPackAC(value));
    setPushUpdate(!pushUpdate);
  };

  return (
    <div>
      <div>
        <SearchPacks />

      </div>
      <div>
        <FilterForId />
      </div>

      <div className={style.PackListContainer}>

        <h4 className={style.name}>
          Name
          {push && <ArrowDownward onClick={() => sortHandlerName('0name')} />}
          {!push && <ArrowUpward onClick={() => sortHandlerName('1name')} />}
        </h4>
        <h4 className={style.count}>
          CardsCount
          {pushCardCount && <ArrowDownward onClick={() => sortHandlerCounter('0cardsCount')} />}
          {!pushCardCount && <ArrowUpward onClick={() => sortHandlerCounter('1cardsCount')} />}
        </h4>
        <h4 className={style.update}>
          Update
          {pushUpdate && <ArrowDownward onClick={() => sortHandlerUpdate('0updated')} />}
          {!pushUpdate && <ArrowUpward onClick={() => sortHandlerUpdate('1updated')} />}
        </h4>

      </div>
    </div>

  );
}

export default HeaderPack;
