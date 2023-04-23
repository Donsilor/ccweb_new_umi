import React, { useEffect, useRef } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import { companyColumns } from '../columns';

function SuperviseCompany() {
  const tableRef = useRef();
  useEffect(() => {
    tableRef.current?.reload();
  }, []);

  return (
    <CCStoreTable
      columns={companyColumns}
      tableKey={'superviseCompany'}
      rowKey={'company'}
      fetchFunc={() => httpCommonClient.post('/SuperviseAction_getCompanyCount', {})}
      ref={tableRef}
    />
  );
}

export default SuperviseCompany;
