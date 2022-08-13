import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'reducers/store';
import {
  CardType, SetCardsTC, setIdCardAC,
} from 'reducers/packCards-reducer';
import { Grades } from 'components/Grades';
import Button from '../../common/button/Button';

import style from './LearnCards.module.css';

type LearnCardsModalType = {
    closeModal: () => void

}
const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );
  console.log('test: ', sum, rand, res);

  return cards[res.id + 1];
};

const LearnCardsModal = ({ closeModal }: LearnCardsModalType) => {
  const dispatch = useAppDispatch();

  const cards = useSelector<AppStateType, CardType[]>((state) => state.cards.cards);
  const name = useSelector<AppStateType, string>((state) => state.cardPacks.params.packName);
  const [show, setShow] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
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
  });

  useEffect(() => {
    if (first) {
      dispatch(SetCardsTC());
      setFirst(false);
    }
    if (cards.length > 0) {
      const firstCard = getCard(cards);
      setCard(firstCard);
      dispatch(setIdCardAC(card._id));
    }
  }, [cards, first]);

  const nextHandler = () => {
    setShow(false);
    if (cards.length > 0) {
      const nextCard = getCard(cards);
      setCard(nextCard);
      dispatch(setIdCardAC(card._id));
    }
  };
  return (

    <div>
      <h4>
        Learn Card:
        {name}
      </h4>
      <h5>Question:</h5>
      {' '}
      {card.question}
      <div className={style.button}>
        {!show && (
        <Button onClick={() => {
          setShow(true);
        }}
        >
          Show Answer
        </Button>
        )}

        {show && (
          <>
            <div>
              <h5>Answer:</h5>
              {' '}
              {card.answer}
            </div>
            <div>
              <Grades />
            </div>
            <Button onClick={nextHandler}>Next</Button>
          </>
        )}
        <Button onClick={closeModal}> Close </Button>
      </div>
    </div>
  );
};

export default LearnCardsModal;
