import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import Button from "../../common/button/Button";
import {CardType, SetCardsTC, setPackAC} from "../../reducers/packCards-reducer";
import {useParams} from "react-router-dom";
import {CardPacksType} from "../../API/cards-api";
import style from './LearnCards.module.css'
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
    // let {pack_id} = useParams()
    // const question = useSelector<AppStateType, string>(state => state.modals.id)

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


    return (

        <div>
            <h4>Learn Card</h4>
            <p>{card.question}</p>
            <div className={style.button}>
            <Button onClick={() => {
                setShow(true)
            }}>Show Answer</Button>

            {show && (
                <>
                    <div>
                        {card.answer}
                    </div>

                    <Button>Next</Button>
                </>
            )}
            <Button onClick={closeModal}> Close </Button>
            </div>
        </div>
    );
};

export default LearnCardsModal;