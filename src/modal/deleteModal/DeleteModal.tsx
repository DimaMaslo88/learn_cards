import React from 'react';
import { useSelector } from 'react-redux';
import { selectId } from 'modal/selectors/SelectorsModal';
import Button from '../../common/button/Button';
import style from './Delete.module.css';

type DeleteModalType = {
    title: string
    deletePack: (id: string) => void
    closeModal: () => void
}

export const DeleteModal = ({ title, deletePack, closeModal }: DeleteModalType) => {
  const idPack = useSelector(selectId);

  return (
    <div>
      <h4 className={style.title}>{title}</h4>
      <div className={style.buttons}>
        <Button onClick={() => deletePack(idPack)}>
          Delete
        </Button>

        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
};
