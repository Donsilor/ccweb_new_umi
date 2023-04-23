import React, { useEffect, useState, useRef } from 'react';
import { Table, Tooltip } from 'antd';
import Icon from '@/components/Icon';
import CCFormModal from '@/components/CCFormModal';
import { ContentArea } from '@/layouts/ViewWrapper';
import { ewInfoConfirmColumn } from './columns';
import OperationArea from '@/layouts/OperationArea';
import BackToList from '@/layouts/BackToList';

function EwDetail(props) {
  let currentRecord = {};
  const modalRef = useRef();
  const params = props.location.state;
  const [excepList, setExcepList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    setLoading(true);
    httpFormClient
      .formSubmit('/BondPrintAction_getExportDataDetailHistoryList', 'beddQuery', params)
      .then(({ data }) => {
        setLoading(false);
        if (data?.result == 0) {
          setExcepList(data.list);
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        setExcepList([]);
        message.error(error.message || error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleException = (record) => {
    currentRecord = record;
    modalRef.current && modalRef.current.show();
  };
  const confirmExcep = (value) => {
    const params = {
      'ebQuery.id': currentRecord.ewBankId,
      'ebQuery.exceptionRemark': value.exceptionRemark,
      'beddQuery.id': currentRecord.id,
    };
    return httpFormClient.formSubmit('/BondPrintAction_markException', '', params);
  };

  const renderColumn = () => {
    const operColumn = {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 60,
      render: (text, record) => {
        if (params.confirmStatus === 0) {
          return (
            !excepList.includes(record.ewBankId) &&
            record.businessType !== 2 && (
              <Tooltip title="标记异常">
                <a onClick={() => handleException(record)}>
                  <Icon type="warning" style={{ color: '#f5222d' }} />
                </a>
              </Tooltip>
            )
          );
        }
      },
    };
    return [...ewInfoConfirmColumn, operColumn];
  };
  return (
    <>
      <ContentArea>
        <Table
          dataSource={excepList}
          columns={renderColumn()}
          scroll={{ x: 800 }}
          rowKey={'id'}
          pagination={false}
          loading={loading}
        />
      </ContentArea>
      <CCFormModal
        title={'二网信息'}
        ref={modalRef}
        afterClose={handleSearch}
        onSubmit={confirmExcep}
        configList={[
          {
            label: '异常描述',
            type: 'textArea',
            key: 'exceptionRemark',
            required: true,
          },
        ]}
      />
      <OperationArea>
        <BackToList />
      </OperationArea>
    </>
  );
}

export default EwDetail;
