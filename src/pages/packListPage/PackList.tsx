import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {FetchCardsTC, setPageAC} from "../../reducers/cards-reducer";
import {CardPacksType} from "../../API/cards-api";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate, useNavigate} from "react-router-dom";
import style from './PackList.module.css'

import Button from "../../common/button/Button";
import Pagination from "./pagination/Pagination";
import {setModalWindowAC} from "../../reducers/modal-reducer";
import {setIdCardAC} from "../../reducers/packCards-reducer";


const PackList = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppStateType, CardPacksType[]>(state => state.cardPacks.cardPacks)
    const pageCount = useSelector<AppStateType, number>(state => state.cardPacks.pageCount)
    const packPage = useSelector<AppStateType, number>(state => state.cardPacks.page)
    const totalCount = useSelector<AppStateType, number>(state => state.cardPacks.cardPacksTotalCount)
    const userId = useSelector<AppStateType, string>(state => state.cardPacks.params.user_id)
    const sort = useSelector<AppStateType, string>(state => state.cardPacks.params.sortPacks)
    const packName = useSelector<AppStateType, string>(state => state.cardPacks.params.packName)


    console.log("sort", sort)

    const setNewPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }
    // const deletePackHandler = (id: string) => {
    //     dispatch(DeletePackTC(id))
    //
    // }
    // const updatePackHandler = (id: string) => {
    //     dispatch(UpdatePackTC(id))
    // }

    useEffect(() => {

        dispatch(FetchCardsTC())
    }, [packPage, userId, sort, packName])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    const openModelWindowHandler = (id: string) => {

        dispatch(setModalWindowAC(true, 'delete', id, ''))

    }
    const openUpdateModelWindowHandler = (id: string) => {

        dispatch(setModalWindowAC(true, 'update', id, ''))

    }
    const openLearnModelWindowHandler = (id: string) => {
        navigate(`${id}`)
        dispatch(setModalWindowAC(true, 'learnCards', id, ''))


    }

    return (

        <div>


            {cards.map(card => {
                const setChangePageToCard = (id: string) => {
                    navigate(`${card._id}`)
                }

                return <div key={card._id} className={style.packList}>
                    <a href={`learn_cards#/pack-list/${card._id}`}>
                        <div style={{width: '250px'}}>{card.name}</div>
                    </a>
                    <div style={{width: '250px'}}>{card.cardsCount}</div>
                    <div style={{width: '250px'}}>{card.updated}</div>

                    <Button onClick={() => openModelWindowHandler(card._id)}>Del</Button>
                    <Button onClick={() => openUpdateModelWindowHandler(card._id)}>Update</Button>
                    <Button onClick={() => openLearnModelWindowHandler(card._id)}>Learn</Button>
                </div>

            })}

            <Pagination packPage={packPage}
                        pageCount={pageCount}
                        callback={setNewPageHandler}
                        totalCount={totalCount}
            />


        </div>
    );
};

export default PackList;