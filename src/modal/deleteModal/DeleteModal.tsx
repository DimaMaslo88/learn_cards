import React from 'react';
import Button from "../../common/button/Button";
import style from "./Delete.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";

type DeleteModalType = {
    title: string
    deletePack: (id: string) => void
    closeModal: () => void
}

export const DeleteModal = ({title, deletePack, closeModal}: DeleteModalType) => {
    const idPack = useSelector<AppStateType, string>(state => state.modals.id)


    return (
        <div>
            <h4 className={style.title}>{title}</h4>
            <div className={style.buttons}>
                <Button onClick={() => deletePack(idPack)}
                >Delete</Button>

                <Button onClick={closeModal}>Cancel</Button>
            </div>
        </div>
    );
};


