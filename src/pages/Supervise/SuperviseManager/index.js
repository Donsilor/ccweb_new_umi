import React, { Component, useState, useRef } from 'react';
import { Button } from 'antd';
import Icons from '@/components/Icon';
import ModalDetail from './ModalDetail';

import OperationArea from '@/layouts/OperationArea';
import { useTableRef } from '@/utils/hooks';
import CCForm from '@/components/CCForm/index.jsx';
import CCStoreTable from '@/components/CCStoreTable';
import { managerForm } from '../formItems';
import { managerColumns } from '../columns';
import _ from 'lodash';

function SuperviseManager() {
  const [loading, setLoading] = useState(false);
  const [tableRef, handleSearch] = useTableRef();
  const modalDetailRef = useRef();

  const operationCol = {
    title: '操作',
    dataIndex: 'action',
    width: 80,
    align: 'center',
    render: (text, record) => {
      return (
        <>
          <a
            onClick={() => {
              modalDetailRef.current.show(record);
            }}
          >
            查看
          </a>
        </>
      );
    },
  };

  const perGenerateFunc = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await httpCommonClient.post('/SuperviseAction_generateSupervision');
      if (data && data.result === 0) {
        const record = {
          normalDealerCnt: Array.isArray(data.normalCount) ? data.normalCount[0] : '',
          normalVehicleCnt: Array.isArray(data.normalCount) ? data.normalCount[1] : '',
          specialDealerCnt: Array.isArray(data.specialCount) ? data.specialCount[0] : '',
          specialVehicleCnt: Array.isArray(data.specialCount) ? data.specialCount[1] : '',
          id: data.logRecordId,
          isPreGenerate: true,
        };
        modalDetailRef.current.show(record);
        setLoading(false);
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message || error || '对不起，接口异常');
    }
  };
  return (
    <>
      <CCForm group={managerForm} onSearch={handleSearch} formKey={'supervise-manager'} />
      <CCStoreTable
        columns={[...managerColumns, operationCol]}
        tableKey={'supervise-manager'}
        formKey={'supervise-manager'}
        fetchFunc={(data, paging) => httpCommonClient.post('/SuperviseAction_getLogRecord', { ...data, ...paging })}
        ref={tableRef}
        scroll={{ x: true }}
      />
      <ModalDetail ref={modalDetailRef} />
      <OperationArea>
        <Button type="primary" icon={<Icons type={'plus'} />} onClick={perGenerateFunc} loading={loading}>
          预生成抽查记录
        </Button>
      </OperationArea>
    </>
  );
}

export default SuperviseManager;
