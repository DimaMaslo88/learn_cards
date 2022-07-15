import React, {useState, MouseEvent} from 'react';

import {Pagination, Stack, TablePagination} from "@mui/material";

type PaginationType = {
    packPage: number
    pageCount: number
    callback: (page: number) => void
    setPageCountCallback: (page: number) => void
    totalCount: number
}
const BasicPagination = ({packPage, pageCount, callback, totalCount, setPageCountCallback}: PaginationType) => {
    // let currentPage = []
    // for (let i = 1; i <= pageCount; i++) {
    //     currentPage.push(i)
    // }
    //
    // const [startPage, setStartPage] = useState<number>(packPage)
    // const [rowsPerPage, setRowsPerPage] = useState<number>(totalCount);
    const onPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        callback(newPage)
    }

    const handleChangeRowsPerPage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPageCountCallback(Number(e.target.value))
    };
    return (


        <TablePagination component="div"
                         count={100}
                         page={packPage}
                         onPageChange={onPageChange}
                         rowsPerPage={pageCount}
                         onRowsPerPageChange={handleChangeRowsPerPage}
        />




        // {/*<div className={style.pageCount}>*/}
        // {/*    {currentPage.map((page,index) => {*/}
        //
        // {/*        return <span key={index}*/}
        //
        // {/*            className={packPage === page ? style.pages : ''}*/}
        // {/*            onClick={() => callback(page)}*/}
        // {/*        >*/}
        // {/*                {page}*/}
        // {/*           */}
        // {/*    </span>*/}
        //
        //
        // {/*    })}*/}
        // {/*</div>*/}

    );
};

export default BasicPagination;