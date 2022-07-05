import React from 'react';
import style from '../PackListContainer.module.css'
import {useAppDispatch} from "../../../reducers/store";
import {sortingPackAC} from "../../../reducers/cards-reducer";

import FilterForId from "../../packListPage/filterForId/FilterForId";
import SearchPacks from "../../packListPage/searchPacks/SearchPacks";


const HeaderPack = () => {
    const dispatch = useAppDispatch()


    const sortHandler = (value: string) => {

        dispatch(sortingPackAC(value))

    }

    return (
        <div>
            <div>
                <SearchPacks/>


            </div>
            <div>
                <FilterForId/>
            </div>

            <div className={style.PackListContainer}>

                <h4 className={style.name} onClick={() => sortHandler('0name')}
                    onDoubleClick={() => sortHandler('1name')}
                >Name</h4>
                <h4 className={style.count} onClick={() => sortHandler('0cardsCount')}
                    onDoubleClick={() => sortHandler('1cardsCount')}
                >CardsCount</h4>
                <h4 className={style.update} onClick={() => sortHandler('0updated')}
                    onDoubleClick={() => sortHandler('1updated')}
                >Update</h4>


            </div>
        </div>

    );
};

export default HeaderPack;