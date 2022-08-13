import React, { ChangeEvent, useState } from 'react';
import { InputTypeFiles } from 'components/inputTypeFiles/InputTypeFiles';
import Button from '../../common/button/Button';
import style from './AddModal.module.css';

type AddModalPropsType = {
    closeModal: () => void
    isLoading: boolean
    addNewPack: (name:string) => void
    packName: string

}

const AddModal = ({
  isLoading, addNewPack, packName, closeModal,
}: AddModalPropsType) => {
  const [value, setValue] = useState(packName);
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const disabled = value === '';

  return (

    <div>
      <h3 className={style.title}>Add New Pack</h3>

      <div className={style.inputForm}>
        <input
          className={style.input}
          value={value}
          onChange={onChangeNameHandler}
        />
      </div>
      <div className={style.inputType}>
        <InputTypeFiles />
      </div>
      <div className={style.buttons}>
        <Button
          onClick={() => addNewPack(value)}
          disabled={disabled}
        >
          Add
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>

    </div>
  );
};

export default AddModal;
