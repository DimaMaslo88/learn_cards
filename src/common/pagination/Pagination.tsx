import React, { MouseEvent } from 'react';

import { Stack, TablePagination } from '@mui/material';

type PaginationType = {
    packPage: number
    pageCount: number
    callback: (page: number) => void
    setPageCountCallback: (page: number) => void
    totalCount: number
}
function BasicPagination({
  packPage, pageCount, callback, totalCount, setPageCountCallback,
}: PaginationType):React.ReactElement {
  const onPageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number):void => {
    callback(newPage);
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ):void => {
    setPageCountCallback(Number(e.target.value));
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
}

export default BasicPagination;
