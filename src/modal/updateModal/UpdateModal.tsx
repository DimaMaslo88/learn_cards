import React, {ChangeEvent, useState} from 'react';
import Button from "../../common/button/Button";
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";


type UpdateModalType = {
    title: string
    closeModal: () => void
    updateNamePack: (id: string, name: string) => void
}


export const UpdateModal = ({title, closeModal, updateNamePack}: UpdateModalType) => {
    const idPack = useSelector<AppStateType, string>(state => state.modals.id)
    const [value, setValue] = useState('')
    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <h4>{title}</h4>
            <div>
                <input value={value}
                       onChange={updateTitleHandler}


                />
            </div>

            <div>
                <Button onClick={() => updateNamePack(idPack, value)}>Update</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </div>
        </div>
    );
};

