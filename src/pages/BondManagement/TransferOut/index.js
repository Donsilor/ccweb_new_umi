import React from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { ViewWrapper, OperArea } from '@/layouts/ViewWrapper';

import { transferOutColumnList } from '../columns';
import { transferInFormList } from '../formItems';
import { useTableRef } from '@/utils/hooks';

function TransferIn(props) {
  const [tableRef, handleSearch] = useTableRef();
  return (
    <>
      <CCForm group={transferInFormList} onSearch={handleSearch} formKey={'transferOut'} />
      <CCStoreTable
        columns={transferOutColumnList}
        tableKey={'transferOut'}
        formKey={'transferOut'}
        rowKey={'bondFlowId'}
        fetchFunc={(data, paging) => httpFormClient.formSubmit('/BondFlowAction_turnOutBondList', 'bfbQuery', data, paging)}
        ref={tableRef}
        scroll={{ x: true }}
      />
    </>
  );
}

export default TransferIn;
