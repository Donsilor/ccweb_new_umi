import React, { useEffect } from 'react';
import CCTable from '@/components/CCTable';
import { useTableRef } from '@/utils/hooks';
import { detailColumns } from './columns';
import BackToList from '@/layouts/BackToList';
import OperationArea from '@/layouts/OperationArea';

function RepositoryDetail(props) {
  const [tableRef, handleSearch] = useTableRef();
  const params = props.location.state;

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <CCTable
        ref={tableRef}
        columns={detailColumns}
        fetchFunc={(data, paging) =>
          httpFormClient.formSubmit('/WhareHouseAction_findDetailImage', '', { cameraCode: params.code }, paging)
        }
      />
      <OperationArea>
        <BackToList />
      </OperationArea>
    </>
  );
}

export default RepositoryDetail;
