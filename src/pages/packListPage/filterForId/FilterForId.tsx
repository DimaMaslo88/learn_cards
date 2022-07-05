import React from 'react';

import { AppStateType, useAppDispatch} from "../../../reducers/store";
import {useSelector} from "react-redux";
import { idFilterPackAC} from "../../../reducers/cards-reducer";


const FilterForId = () => {
    const dispatch = useAppDispatch()
    const userId=useSelector<AppStateType, string>(state => state.auth.profile._id)

    const filterHandler = (value: string) => {
        dispatch(idFilterPackAC(value))
    }


    return (
        <p>
            <button onClick={() => filterHandler(userId)}>My</button>
            <button onClick={() => filterHandler('')}>All</button>
        </p>
    );
};

export default FilterForId;