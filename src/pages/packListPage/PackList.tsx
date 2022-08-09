import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  selectCardsPack,
  selectIsLoggedIn, selectPackName,
  selectPackPageCount,
  selectPackSort,
  selectPackTotalCount,
  selectUserId,
}
  from 'reducers/selectors/Selectors';
import { FetchCardsTC, setPageAC, setPageCountAC } from 'reducers/cards-reducer';

import { useAppDispatch } from 'reducers/store';
import { setModalWindowAC } from 'reducers/modal-reducer';
import style from './PackList.module.css';
import Button from '../../common/button/Button';
import s from '../../common/button/Button.module.css';
import BasicPagination from '../../common/pagination/Pagination';

function PackList():React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cards = useSelector(selectCardsPack);
  const pageCount = useSelector(selectPackPageCount);
  const packPage = useSelector(selectPackPageCount);
  const totalCount = useSelector(selectPackTotalCount);
  const userId = useSelector(selectUserId);
  const sort = useSelector(selectPackSort);
  const packName = useSelector(selectPackName);

  const setNewPageHandler = (page: number):void => {
    dispatch(setPageAC(page));
  };
  const setNewPageCountHandler = (page: number):void => {
    dispatch(setPageCountAC(page));
  };

  useEffect(() => {
    dispatch(FetchCardsTC());
  }, [packPage, userId, sort, packName]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  const openModelWindowHandler = (id: string):void => {
    dispatch(setModalWindowAC(true, 'delete', id, ''));
  };
  const openUpdateModelWindowHandler = (id: string):void => {
    dispatch(setModalWindowAC(true, 'update', id, ''));
  };
  const openLearnModelWindowHandler = (id: string):void => {
    navigate(`${id}`);
    dispatch(setModalWindowAC(true, 'learnCards', id, ''));
  };

  return (

    <div>

      <div>
        {cards.map((card) => (
          <div key={card._id} className={style.packList}>

            <a href={`learn_cards#/pack-list/${card._id}`}>
              <div style={{ width: '250px' }}>{card.name}</div>
            </a>
            <div style={{ width: '250px' }}>{card.cardsCount}</div>
            <div style={{ width: '250px' }}>{card.updated}</div>

            <Button
              disabled={!userId}
              className={s.red}
              onClick={() => openModelWindowHandler(card._id)}
            >
              Del
            </Button>
            <Button
              disabled={!userId}
              onClick={() => openUpdateModelWindowHandler(card._id)}
            >
              Update
            </Button>
            <Button onClick={() => openLearnModelWindowHandler(card._id)}>Learn</Button>
          </div>
        ))}
      </div>
      <div className={style.pagination}>

        <BasicPagination
          packPage={packPage}
          pageCount={pageCount}
          callback={setNewPageHandler}
          setPageCountCallback={setNewPageCountHandler}
          totalCount={totalCount}
        />
      </div>

    </div>
  );
}

export default PackList;
