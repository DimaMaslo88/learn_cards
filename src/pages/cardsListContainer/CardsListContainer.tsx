import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { setModalWindowAC } from 'reducers/modal-reducer';
import { useAppDispatch } from 'reducers/store';
import { ModalWindow } from 'modal/Modal';
import CardsList from '../cardsListPage/CardsList';
import HeaderPack from './header/Header';
import Button from '../../common/button/Button';

function CardsListContainer():React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const returnPack = ():void => {
    navigate('/pack-list');
  };

  const openModelWindowAddLearnCardHandler = ():void => {
    dispatch(setModalWindowAC(true, 'addCard', '', ''));
  };
  return (
    <div>
      <h2>Cards</h2>

      <Button onClick={returnPack}>
        {' '}
        <ArrowBack />
      </Button>
      <Button onClick={openModelWindowAddLearnCardHandler}>Add Card</Button>

      <div>
        <HeaderPack />

      </div>

      <div>
        <CardsList />
      </div>
      <ModalWindow />
    </div>
  );
}

export default CardsListContainer;
