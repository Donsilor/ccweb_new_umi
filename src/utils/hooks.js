import React, { useRef } from 'react';
export const useTableRef = () => {
  const tableRef = useRef();
  const handleSearch = () => {
    tableRef.current && tableRef.current.reload();
  };
  return [tableRef, handleSearch];
};
