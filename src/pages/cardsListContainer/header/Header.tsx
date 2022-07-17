import React, {useState} from 'react';

import style from './Header.module.css'

import {useAppDispatch} from "../../../reducers/store";
import {sortingCardsAC} from "../../../reducers/packCards-reducer";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";

const HeaderPack = () => {
    const dispatch = useAppDispatch()
    const [sortQuestion, setSortQuestion] = useState<boolean>(false)
    const [sortAnswer, setSortAnswer] = useState<boolean>(false)
    const [sortGrade, setSortGrade] = useState<boolean>(false)
    const [sortUpdate, setSortUpdate] = useState<boolean>(false)

    const sortHandlerQuest = (sort: string) => {
        dispatch(sortingCardsAC(sort))
        setSortQuestion(!sortQuestion)
    }
    const sortHandlerAnswer = (sort: string) => {
        dispatch(sortingCardsAC(sort))
        setSortAnswer(!sortAnswer)
    }
    const sortHandlerGrade = (sort: string) => {
        dispatch(sortingCardsAC(sort))
        setSortGrade(!sortGrade)
    }
    const sortHandlerUpdate = (sort: string) => {
        dispatch(sortingCardsAC(sort))
        setSortUpdate(!sortUpdate)
    }

        return (

            <div className={style.cardsListContainer}>

                <h4 className={style.question}>Question
                    {sortQuestion && < ArrowDownward onClick={() => sortHandlerQuest('0question')}/>}
                    {!sortQuestion && < ArrowUpward onClick={() => sortHandlerQuest('1question')}/>}
                </h4>
                <h4 className={style.answer}>Answer
                    {sortAnswer && < ArrowDownward onClick={() => sortHandlerAnswer('0answer')}/>}
                    {!sortAnswer && < ArrowUpward onClick={() => sortHandlerAnswer('1answer')}/>}

                </h4>
                <h4 className={style.grade}>Grade
                    {sortGrade && < ArrowDownward onClick={() => sortHandlerGrade('0grade')}/>}
                    {!sortGrade && < ArrowUpward onClick={() => sortHandlerGrade('1grade')}/>}
                </h4>
                <h4 className={style.update}>Update
                    {sortUpdate && < ArrowDownward onClick={() => sortHandlerUpdate('0update')}/>}
                    {!sortUpdate && < ArrowUpward onClick={() => sortHandlerUpdate('1update')}/>}
                </h4>


            </div>


        );
    };

    export default HeaderPack;