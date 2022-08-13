import React from 'react';
import { useSelector } from 'react-redux';
import { selectId } from 'modal/selectors/SelectorsModal';
import Button from '../../common/button/Button';
import style from './DeleteLearningCardsModal.module.scss';

type DeleteLearningCardsModalType = {
    title: string
    closeModal: () => void
    deleteLearningCards: (id: string) => void
}

export const DeleteLearningCardsModal = ({ title, closeModal, deleteLearningCards }: DeleteLearningCardsModalType) => {
  const idCard = useSelector(selectId);
  return (
    <div className={style.del}>
      <h4>{title}</h4>
      <div className={style.buttons}>
        <Button onClick={() => deleteLearningCards(idCard)}>Delete</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
};
