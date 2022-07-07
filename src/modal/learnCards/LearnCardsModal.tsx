import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import Button from "../../common/button/Button";
import {CardType, SetCardsTC, setPackAC} from "../../reducers/packCards-reducer";

import {CardPacksType} from "../../API/cards-api";
import style from './LearnCards.module.css'
import Icon from '@mui/material/Icon';
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import {SentimentDissatisfied} from "@material-ui/icons";
import {Grades} from "../../components/Grades";
type LearnCardsModalType = {
    closeModal: () => void

}
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (1 - card.grade) * (1 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (1 - card.grade) * (1 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const LearnCardsModal = ({closeModal}: LearnCardsModalType) => {
    const dispatch = useAppDispatch();

    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)
    const pack = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks)
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
        if (cards.length > 0) setCard(getCard(cards));

    }, [cards, first])

    const nextHandler = () => {
        setShow(false)
        if (cards.length > 0) {
            setCard(getCard(cards))
        } else {

        }
    }
    return (

        <div>
            <h4>Learn Card</h4>
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

                      <Grades/>

                        <Button onClick={nextHandler}>Next</Button>
                    </>
                )}
                <Button onClick={closeModal}> Close </Button>
            </div>
        </div>
    );
};

export default LearnCardsModal;