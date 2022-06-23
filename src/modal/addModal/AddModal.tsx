import React, {ChangeEvent, useState} from 'react';
import Button from "../../common/button/Button";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../reducers/store";
import {addCardsAC} from "../../reducers/cards-reducer";
import CircularProgress from "@mui/material/CircularProgress";

type AddModalPropsType = {
    closeModal: () => void
    isLoading: boolean
    addNewPack: (name:string) => void
    packName: string

}

const AddModal = ({isLoading, addNewPack, packName, closeModal}: AddModalPropsType) => {
    const [value, setValue] = useState(packName)
    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    let disabled = value === ''


    return (

        <div>
            <h3>Add New Pack</h3>
            <form>
                <input value={value}
                       onChange={onChangeNameHandler}
                />
                <Button onClick={()=>addNewPack(value)}
                        disabled={disabled}
                >Add</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </form>

        </div>
    );
};

export default AddModal;