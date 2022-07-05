import React from 'react';
import CardsList from "../cardsListPage/CardsList";
import HeaderPack from "./header/Header";
import { useNavigate} from "react-router-dom";
import Button from "../../common/button/Button";
import {setModalWindowAC} from "../../reducers/modal-reducer";
import { useAppDispatch} from "../../reducers/store";
import {ModalWindow} from "../../modal/Modal";


const CardsListContainer = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const userId=useSelector<AppStateType,string>(state=>state.auth.profile._id)

    const returnPack=()=>{
         navigate(`/pack-list`)
    }

    const openModelWindowAddLearnCardHandler = () => {

        dispatch(setModalWindowAC(true, 'addCard','',''))

    }
    return (
        <div>
            <h2>Cards</h2>

            <Button onClick={returnPack} >Back</Button>
            <Button onClick={openModelWindowAddLearnCardHandler}>Add Card</Button>

            <div>
                <HeaderPack/>

            </div>

            <div>
                <CardsList/>
            </div>
            < ModalWindow/>
        </div>
    )
};

export default CardsListContainer;