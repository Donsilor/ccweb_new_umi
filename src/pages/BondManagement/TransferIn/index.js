import React from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';

import { transferInColumnList } from '../columns';
import { transferInFormList } from '../formItems';
import { useTableRef } from '@/utils/hooks';

function TransferIn() {
  const [tableRef, handleSearch] = useTableRef();

  return (
    <>
      <CCForm group={transferInFormList} onSearch={handleSearch} formKey={'transferIn'} />
      <CCStoreTable
        columns={transferInColumnList}
        tableKey={'transferIn'}
        formKey={'transferIn'}
        rowKey={'bondFlowId'}
        fetchFunc={(data, paging) => httpFormClient.formSubmit('/BondFlowAction_turnInBondList', 'bfbQuery', data, paging)}
        ref={tableRef}
        scroll={{ x: true }}
      />
    </>
  );
}

export default TransferIn;
