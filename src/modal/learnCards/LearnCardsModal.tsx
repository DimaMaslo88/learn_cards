import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";
import Button from "../../common/button/Button";

type LearnCardsModalType = {
    closeModal: () => void

}
const LearnCardsModal = ({closeModal}: LearnCardsModalType) => {

    const question = useSelector<AppStateType, string>(state => state.modals.question)
    console.log(question, 'q')

    return (

        <div>
            {question}

            <Button>Show Answer</Button>
            <Button onClick={closeModal}> Close </Button>

        </div>
    );
};

export default LearnCardsModal;