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

    const onPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        callback(newPage)
    }

    const handleChangeRowsPerPage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPageCountCallback(Number(e.target.value))
    };
    return (


        <TablePagination
            count={totalCount}
            page={packPage}
            onPageChange={onPageChange}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />


    );
};

export default BasicPagination;