import React from 'react';
import Button from '../../../common/button/Button';
import style from '../CardsListContainer.module.css'
import {setModalWindowAC} from "../../../reducers/modal-reducer";
import {useAppDispatch} from "../../../reducers/store";

const HeaderPack = () => {


    // const name=useSelector<AppStateType,CardPacksType[]>(state=>state.cardPacks)

    // const addPack=()=>{
    //     dispatch(CreateCardsTC(name))
    // }


    return (

        <div className={style.cardsListContainer}>

            <h4 className={style.question}>Question</h4>
            <h4 className={style.answer}>Answer</h4>
            <h4 className={style.grade}>Grade</h4>
            <h4 className={style.update}>Update</h4>



        </div>


    );
};

export default HeaderPack;