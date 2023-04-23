import React from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { useTableRef } from '@/utils/hooks';

function ListView({ formItemList, columns, pageKey, fetchFunc }) {
  const [tableRef, handleSearch] = useTableRef();

  return (
    <>
      <CCForm group={formItemList} onSearch={handleSearch} formKey={pageKey} />
      <CCStoreTable
        columns={columns}
        tableKey={pageKey}
        formKey={pageKey}
        rowKey={'id'}
        fetchFunc={fetchFunc}
        ref={tableRef}
        scroll={{ x: true }}
      />
    </>
  );
}

export default ListView;
