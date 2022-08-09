import React, { useState } from 'react';

import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { useAppDispatch } from 'reducers/store';
import { sortingCardsAC } from 'reducers/packCards-reducer';
import style from './Header.module.css';

function HeaderPack():React.ReactElement {
  const dispatch = useAppDispatch();
  const [sortQuestion, setSortQuestion] = useState<boolean>(false);
  const [sortAnswer, setSortAnswer] = useState<boolean>(false);
  const [sortGrade, setSortGrade] = useState<boolean>(false);
  const [sortUpdate, setSortUpdate] = useState<boolean>(false);

  const sortHandlerQuest = (sort: string):void => {
    dispatch(sortingCardsAC(sort));
    setSortQuestion(!sortQuestion);
  };
  const sortHandlerAnswer = (sort: string):void => {
    dispatch(sortingCardsAC(sort));
    setSortAnswer(!sortAnswer);
  };
  const sortHandlerGrade = (sort: string):void => {
    dispatch(sortingCardsAC(sort));
    setSortGrade(!sortGrade);
  };
  const sortHandlerUpdate = (sort: string):void => {
    dispatch(sortingCardsAC(sort));
    setSortUpdate(!sortUpdate);
  };

  return (

    <div className={style.cardsListContainer}>

      <h4 className={style.question}>
        Question
        {sortQuestion && <ArrowDownward onClick={() => sortHandlerQuest('0question')} />}
        {!sortQuestion && <ArrowUpward onClick={() => sortHandlerQuest('1question')} />}
      </h4>
      <h4 className={style.answer}>
        Answer
        {sortAnswer && <ArrowDownward onClick={() => sortHandlerAnswer('0answer')} />}
        {!sortAnswer && <ArrowUpward onClick={() => sortHandlerAnswer('1answer')} />}

      </h4>
      <h4 className={style.grade}>
        Grade
        {sortGrade && <ArrowDownward onClick={() => sortHandlerGrade('0grade')} />}
        {!sortGrade && <ArrowUpward onClick={() => sortHandlerGrade('1grade')} />}
      </h4>
      <h4 className={style.update}>
        Update
        {sortUpdate && <ArrowDownward onClick={() => sortHandlerUpdate('0update')} />}
        {!sortUpdate && <ArrowUpward onClick={() => sortHandlerUpdate('1update')} />}
      </h4>

    </div>

  );
}

export default HeaderPack;
