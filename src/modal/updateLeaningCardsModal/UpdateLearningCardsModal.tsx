import React, {ChangeEvent, useState} from 'react';
import Button from "../../common/button/Button";
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";
import {useParams} from "react-router-dom";

type UpdateLearningCardsModalType = {
    title: string
    closeModal: () => void
    updateLearningCards: (_id: string, question: string) => void
}

export const UpdateLearningCardsModal = ({title, closeModal, updateLearningCards}: UpdateLearningCardsModalType) => {
    const id = useSelector<AppStateType, string>(state => state.modals.id)
   // let {question} = useParams()
    const [value, setValue] = useState<string>('')
    const onChangeLearningCard = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }


    return (
        <div>
            <h4>{title}</h4>
            <input
                value={value}
                onChange={onChangeLearningCard}

            />
            <Button onClick={() => updateLearningCards(id, value)}>Update</Button>
            <Button onClick={closeModal}>Cancel</Button>
        </div>
    );
};

