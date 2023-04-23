import React from 'react';
import { useTableRef } from '@/utils/hooks';
import CCForm from '@/components/CCForm';
import CCStoreTable from '@/components/CCStoreTable';
import formItemList from './formItems';
import { goneColumns } from './columns';

function GonePage(props) {
  const [tableRef, handleSearch] = useTableRef();

  return (
    <>
      <CCForm group={formItemList} onSearch={handleSearch} formKey={'repositoryWarning-gone'} />
      <CCStoreTable
        columns={goneColumns}
        ref={tableRef}
        tableKey={'repositoryWarning-gone'}
        formKey={'repositoryWarning-gone'}
        rowKey={'id'}
        fetchFunc={(data, paging) =>
          httpCommonClient.post('/WhareHouseAction_getWarning', {
            ...data,
            isRemove: 1,
            ...paging,
          })
        }
      />
    </>
  );
}

export default GonePage;
