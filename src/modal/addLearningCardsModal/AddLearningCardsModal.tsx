import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPackId } from 'reducers/selectors/Selectors';
import Button from '../../common/button/Button';
import style from './AddLeaningCardsModal.module.css';

type AddLearningCardsModalType = {
    title: string
    addNewLearningCard: (question: string, answer: string, cardsPack_id: string) => void
    closeModal: () => void
}

export const AddLearningCardsModal = ({ title, addNewLearningCard, closeModal }: AddLearningCardsModalType) => {
  const packId = useSelector(selectPackId);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };
  return (
    <div>
      <h4 className={style.title}>{title}</h4>
      <div className={style.inputForm}>
        <div>
          <input
            className={style.input}
            placeholder="question"
            value={question}
            onChange={onChangeQuestionHandler}
          />
        </div>
        <div>
          <input
            className={style.input}
            placeholder="answer"
            value={answer}
            onChange={onChangeAnswerHandler}
          />
        </div>
      </div>
      <div className={style.button}>
        <Button onClick={() => addNewLearningCard(question, answer, packId)}>
          Save
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>

    </div>
  );
};
