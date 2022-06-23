import React, {ChangeEvent} from 'react';
import style from "./SearchPacks.module.css"
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../../reducers/store";
import {CreateCardsTC, searchByNameAC} from "../../../reducers/cards-reducer";
import Button from "../../../common/button/Button";

import {setModalWindowAC} from "../../../reducers/modal-reducer";
import {ModalWindow} from "../../../modal/Modal";

const SearchPacks = () => {
    const dispatch = useAppDispatch()
    const value = useSelector<AppStateType, string>(state => state.cardPacks.params.packName)
    const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByNameAC(e.currentTarget.value))
    }

    const openModelWindowHandler=()=>{

        dispatch(setModalWindowAC(true,'add',''))

    }

    return (

        <div className={style.component}>
            <input className={style.input}
                   placeholder={'search packs'}
                   value={value}
                   onChange={searchNameHandler}


            />

            <Button onClick={openModelWindowHandler}>Add Pack</Button>

            < ModalWindow/>
        </div>


    );
};

export default SearchPacks;