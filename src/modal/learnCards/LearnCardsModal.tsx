import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import Button from "../../common/button/Button";
import {CardType, SetCardsTC} from "../../reducers/packCards-reducer";

type LearnCardsModalType = {
    closeModal: () => void

}
const LearnCardsModal = ({closeModal}: LearnCardsModalType) => {
    const dispatch = useAppDispatch();

    const question = useSelector<AppStateType, string>(state => state.modals.id)
    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)

    useEffect(() => {
        dispatch(SetCardsTC())
    }, [cards,question])


    console.log(question, 'q')

    return (

        <div>
            <h4>Question: {cards.map(card=>card._id?card.question:'')}</h4>

            <Button>Show Answer</Button>
            <Button onClick={closeModal}> Close </Button>

        </div>
    );
};

export default LearnCardsModal;