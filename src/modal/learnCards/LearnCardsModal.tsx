import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import Button from "../../common/button/Button";
import {CardType, SetCardsTC, setIdCardAC, setPackAC} from "../../reducers/packCards-reducer";

import style from './LearnCards.module.css'

import {Grades} from "../../components/Grades";
import {addCardsAC} from "../../reducers/cards-reducer";


type LearnCardsModalType = {
    closeModal: () => void

}
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const LearnCardsModal = ({closeModal}: LearnCardsModalType) => {

    const dispatch = useAppDispatch();

    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)
    const name = useSelector<AppStateType, string>(state => state.cardPacks.params.packName)
    const [show, setShow] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: '',
    })

    useEffect(() => {

        if (first) {
            dispatch(SetCardsTC())
            setFirst(false)
        }
        if (cards.length > 0) {
            const card = getCard(cards)
            setCard(card)
            dispatch(setIdCardAC(card._id))
            dispatch(addCardsAC(name))
        }

    }, [cards, first,name])

    const nextHandler = () => {
        setShow(false)
        if (cards.length > 0) {
            const card = getCard(cards)
            setCard(card)
            dispatch(setIdCardAC(card._id))
        } else {

        }
    }
    return (

        <div>
            <h4>Learn Card:{name}</h4>
            <h5>Question:</h5> {card.question}
            <div className={style.button}>
                {!show && <Button onClick={() => {
                    setShow(true)
                }}>Show Answer</Button>
                }

                {show && (
                    <>
                        <div>
                            <h5>Answer:</h5> {card.answer}
                        </div>
<p>
                        <Grades />
</p>
                        <Button onClick={nextHandler}>Next</Button>
                    </>
                )}
                <Button onClick={closeModal}> Close </Button>
            </div>
        </div>
    );
};

export default LearnCardsModal;