import React from 'react';
import Button from "../../common/button/Button";

type UpdateLearningCardsModalType = {
    title: string
    closeModal:()=>void
}

export const UpdateLearningCardsModal = ({title,closeModal}: UpdateLearningCardsModalType) => {
    return (
        <div>
            <h4>{title}</h4>
            <Button >Update</Button>
            <Button onClick={closeModal}>Cancel</Button>
        </div>
    );
};

