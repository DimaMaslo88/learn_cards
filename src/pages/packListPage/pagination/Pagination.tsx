import React from 'react';
import style from "../PackList.module.css";

type PaginationType = {
    packPage: number
    pageCount: number
    callback: (page: number) => void
    totalCount: number
}
const Pagination = ({packPage, pageCount, callback, totalCount}: PaginationType) => {
    let currentPage = []
    for (let i = 1; i <= pageCount; i++) {
        currentPage.push(i)
    }
    return (

        <div>

            <div className={style.pageCount}>
                {currentPage.map((page,index) => {

                    return <span key={index}

                        className={packPage === page ? style.pages : ''}
                        onClick={() => callback(page)}
                    >
                            {page}
                       
                </span>


                })}
            </div>
        </div>
    );
};

export default Pagination;