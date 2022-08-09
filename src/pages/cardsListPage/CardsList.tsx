import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'reducers/store';
import {
  CardType, SetCardsTC, setPackAC, setPageCardAC,
} from 'reducers/packCards-reducer';
import { setModalWindowAC } from 'reducers/modal-reducer';

import BasicPagination from 'common/pagination/Pagination';
import { setPageCountAC } from 'reducers/cards-reducer';
import {
  selectCards,
  selectIsLoggedIn,
  selectPage,
  selectPageCount,
  selectSort,
  selectTotalCount,
  selectUserId,
}
  from 'reducers/selectors/Selectors';
import s from '../../common/button/Button.module.css';
import Button from '../../common/button/Button';
import style from './CardsList.module.css';

function CardsList():React.ReactElement {
  const dispatch = useAppDispatch();
  const { packId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cards = useSelector(selectCards);
  const pageCount = useSelector(selectPageCount);
  const sort = useSelector(selectSort);
  const userId = useSelector(selectUserId);
  const page = useSelector(selectPage);
  const totalCount = useSelector(selectTotalCount);

  const setCardPage = (value: number):void => {
    dispatch(setPageCardAC(value));
  };
  const setCardCountPage = (value: number):void => {
    dispatch(setPageCountAC(value));
  };

  useEffect(() => {
    if (packId) {
      dispatch(setPackAC(packId) as any);
    }
    dispatch(SetCardsTC());
  }, [packId, sort]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const currentPage = [];
  for (let i = 1; i <= pageCount; i + 1) {
    currentPage.push(i);
  }

  const openModalWindowDeleteLearningCard = (id: string):void => {
    dispatch(setModalWindowAC(true, 'deleteCard', id, ''));
  };
  const openModalWindowUpdateLearningCard = (_id: string, question: string):void => {
    dispatch(setModalWindowAC(true, 'updateCard', _id, question));
  };

  return (

    <div className={style.cards}>

      {cards.map(({
        _id, answer, question, grade, updated,
      }: CardType) => (
        <div key={_id} className={style.cardsList}>

          <div style={{ width: '250px' }}>{question}</div>
          <div style={{ width: '250px' }}>{answer}</div>
          <div style={{ width: '250px' }}>{grade}</div>
          <div style={{ width: '250px' }}>{updated}</div>
          <div>
            <Button
              disabled={!userId}
              className={s.red}
              onClick={() => openModalWindowDeleteLearningCard(_id)}
            >
              Delete
            </Button>
            <Button
              disabled={!userId}
              onClick={() => openModalWindowUpdateLearningCard(_id, question)}
            >
              Update
            </Button>
          </div>
        </div>
      ))}
      <div className={style.pageCount}>
        <BasicPagination
          packPage={page}
          pageCount={pageCount}
          callback={setCardPage}
          setPageCountCallback={setCardCountPage}
          totalCount={totalCount}
        />

      </div>
    </div>
  );
}

export default CardsList;
