import {AppStateType, useAppDispatch} from "../../reducers/store";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import style from "../cardsListPage/CardsList.module.css";
import {CardType, SetCardsTC, setPackAC} from "../../reducers/packCards-reducer";
import Button from "../../common/button/Button";
import {setModalWindowAC} from "../../reducers/modal-reducer";
import s from '../../common/button/Button.module.css'

const CardsList = () => {
    const dispatch = useAppDispatch()
    let {pack_id} = useParams()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)
    const sort = useSelector<AppStateType, string>(state => state.cards.sortCards)
    const onClickHandler = () => {
        dispatch(SetCardsTC())
    }

    useEffect(() => {

        if (pack_id) {
            dispatch(setPackAC(pack_id) as any)
        }
        dispatch(SetCardsTC())
    }, [pack_id, sort])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    let currentPage = []
    for (let i = 1; i <= pageCount; i++) {
        currentPage.push(i)
    }

    const openModalWindowDeleteLearningCard = (id: string) => {
        dispatch(setModalWindowAC(true, 'deleteCard', id, ''))
    }
    const openModalWindowUpdateLearningCard = (_id: string, question: string) => {
        dispatch(setModalWindowAC(true, 'updateCard', _id, question))
    }

    return (

        <div>

            {cards.map(({_id, answer, question, grade, updated}: CardType) => {

                return <div key={_id} className={style.cardsList}>

                    <div style={{width: '250px'}}>{question}</div>
                    <div style={{width: '250px'}}>{answer}</div>
                    <div style={{width: '250px'}}>{grade}</div>
                    <div style={{width: '250px'}}>{updated}</div>
                    <div>
                        <Button className={s.red} onClick={() => openModalWindowDeleteLearningCard(_id)}>Delete</Button>
                        <Button onClick={() => openModalWindowUpdateLearningCard(_id, question)}>Update</Button>
                    </div>
                </div>

            })}
            <div className={style.pageCount}>
                {currentPage.map((page, index) => {
                    return <span key={index}
                                 onClick={onClickHandler}
                    >
{page}
                </span>
                })}

            </div>
        </div>
    );
};

export default CardsList;