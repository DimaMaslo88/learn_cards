import {AppStateType, useAppDispatch} from "../../reducers/store";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import style from "../cardsListPage/CardsList.module.css";
import {CardType, SetCardsTC, setPackAC, setPageCardAC} from "../../reducers/packCards-reducer";
import Button from "../../common/button/Button";
import {setModalWindowAC} from "../../reducers/modal-reducer";
import s from '../../common/button/Button.module.css'
import Pagination from "../../common/pagination/Pagination";
import BasicPagination from "../../common/pagination/Pagination";
import {setPageCountAC} from "../../reducers/cards-reducer";

const CardsList = () => {
    const dispatch = useAppDispatch()
    let {pack_id} = useParams()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardType[]>(state => state.cards.cards)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)
    const sort = useSelector<AppStateType, string>(state => state.cards.sortCards)
    const userId = useSelector<AppStateType, string>(state => state.cardPacks.params.user_id)
    const page=useSelector<AppStateType,number>(state=>state.cards.page)
    const totalCount=useSelector<AppStateType,number>(state=>state.cards.cardsTotalCount)


    const setCardPage = (page:number) => {
        dispatch(setPageCardAC(page))
    }
    const setCardCountPage = (page:number) => {
        dispatch(setPageCountAC(page))
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

        <div className={style.cards}>

            {cards.map(({_id, answer, question, grade, updated}: CardType) => {

                return <div key={_id} className={style.cardsList}>

                    <div style={{width: '250px'}}>{question}</div>
                    <div style={{width: '250px'}}>{answer}</div>
                    <div style={{width: '250px'}}>{grade}</div>
                    <div style={{width: '250px'}}>{updated}</div>
                    <div>
                        <Button disabled={!userId} className={s.red}
                                onClick={() => openModalWindowDeleteLearningCard(_id)}>Delete</Button>
                        <Button disabled={!userId}
                            onClick={() => openModalWindowUpdateLearningCard(_id, question)}>Update</Button>
                    </div>
                </div>

            })}
            <div className={style.pageCount}>
               <BasicPagination
                   packPage={page}
                   pageCount={pageCount}
                   callback={setCardPage}
                   setPageCountCallback={setCardCountPage}
                   totalCount={totalCount}/>

            </div>
        </div>
    );
};

export default CardsList;