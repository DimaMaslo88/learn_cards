import React from 'react';
import Button from "../../common/button/Button";
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";
import style from './DeleteLearningCardsModal.module.scss'

type DeleteLearningCardsModalType = {
    title: string
    closeModal: () => void
    deleteLearningCards: (id: string) => void
}


export const DeleteLearningCardsModal = ({title, closeModal, deleteLearningCards}: DeleteLearningCardsModalType) => {
    const idCard = useSelector<AppStateType, string>(state => state.modals.id)
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

