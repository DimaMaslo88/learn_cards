import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectId } from 'modal/selectors/SelectorsModal';
import Button from '../../common/button/Button';
import style from './UpdateModal.module.css';

type UpdateModalType = {
    title: string
    closeModal: () => void
    updateNamePack: (id: string, name: string) => void
}

export const UpdateModal = ({ title, closeModal, updateNamePack }: UpdateModalType) => {
  const idPack = useSelector(selectId);
  const [value, setValue] = useState('');
  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const disabled = value === '';
  return (
    <div>
      <h4 className={style.title}>{title}</h4>
      <div className={style.form}>
        <input
          className={style.input}
          value={value}
          onChange={updateTitleHandler}
        />
      </div>

      <div className={style.buttons}>
        <Button
          onClick={() => updateNamePack(idPack, value)}
          disabled={disabled}
        >
          Update
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
};
