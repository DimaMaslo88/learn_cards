import React, {ChangeEvent, useState} from 'react';
import Button from "../../common/button/Button";
import style from "./AddLeaningCardsModal.module.css"
import {RequestAddCardType} from "../../API/packCards-api";
import {useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";

type AddLearningCardsModalType = {
    title: string
    addNewLearningCard: (cardsPack_id: string, question: string, answer: string, grade: number) => void
    closeModal: () => void
}

export const AddLearningCardsModal = ({title, addNewLearningCard, closeModal}: AddLearningCardsModalType) => {
    const packId=useSelector<AppStateType,string>(state=>state.cards.cardsPack_id)
    const grade=useSelector<AppStateType,number>(state=>state.cards.maxGrade)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    return (
        <div>
            <h4 className={style.title}>{title}</h4>
            <div className={style.inputForm}>
                <div>
                    <input value={question}
                           onChange={onChangeQuestionHandler}/>
                </div>
                <div>
                    <input value={answer}
                           onChange={onChangeAnswerHandler}/>
                </div>
            </div>
            <div>
                <Button onClick={() => addNewLearningCard(question, answer,packId,grade)}>Save</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </div>


        </div>
    );
};

