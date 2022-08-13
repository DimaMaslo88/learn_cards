import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from 'reducers/store';
import Button from '../../common/button/Button';
import style from './UpdateLearningCards.module.scss';

type UpdateLearningCardsModalType = {
    title: string
    closeModal: () => void
    updateLearningCards: (_id: string, question: string) => void
}

export const UpdateLearningCardsModal = ({ title, closeModal, updateLearningCards }: UpdateLearningCardsModalType) => {
  const id = useSelector<AppStateType, string>((state) => state.modals.id);
  const name = useSelector<AppStateType, string>((state) => state.modals.question);
  console.log(name, 'name');

  const [value, setValue] = useState<string>(name);
  const onChangeLearningCard = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={style.update}>
      <h4>{title}</h4>
      <div>
        <input
          className={style.input}
          value={value}
          onChange={onChangeLearningCard}
        />
      </div>
      <div className={style.button}>
        <Button onClick={() => updateLearningCards(id, value)}>Update</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
};
