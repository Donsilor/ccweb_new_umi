import React from 'react';
import { Popconfirm, Button } from 'antd';
import CCForm from '@/components/CCForm/index.jsx';
import { useTableRef } from '@/utils/hooks';
import CCStoreTable from '@/components/CCStoreTable';
import OperationArea from '@/layouts/OperationArea';
import EditDealerModal from './EditDealerModal';
import { specialDealerForm } from '../formItems';
import { specialDColumns } from '../columns';
import Icons from '@/components/Icon';

function SpecialDealer() {
  const [tableRef, handleSearch] = useTableRef();
  const dealerModalRef = React.createRef();

  const editRecord = (record) => () => {
    dealerModalRef.current?.show(record);
  };
  const deleteDealer = (record) => async () => {
    const params = {
      ...record,
      startTime: null,
      endTime: null,
    };
    const { data } = await httpCommonClient.post('/SuperviseAction_updateSpecialDealer', params);
    if (data.result === 0) {
      message.success('操作成功！', 2.5);
      reload();
    } else {
      message.error(data.msg || '操作失败，请稍后重试');
    }
  };
  const addDealer = () => {
    dealerModalRef.current?.show();
  };

  const reload = () => {
    tableRef.current?.reload();
  };

  const actionColumn = {
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '90px',
    render: (text, record) => {
      return (
        <>
          <a onClick={editRecord(record)}>修改</a>
          <Popconfirm
            title="确认删除这条特殊抽查记录？"
            onConfirm={deleteDealer(record)}
            okText="确认"
            cancelText="取消"
            placement="topRight"
          >
            <a style={{ margin: '0 10px' }}>删除</a>
          </Popconfirm>
        </>
      );
    },
  };
  return (
    <>
      <CCForm group={specialDealerForm} onSearch={handleSearch} formKey={'supervise-specialDealer'} />
      <CCStoreTable
        columns={[...specialDColumns, actionColumn]}
        tableKey={'supervise-specialDealer'}
        formKey={'supervise-specialDealer'}
        fetchFunc={(data, paging) =>
          httpCommonClient.post('/SuperviseAction_getSpecialDealer', {
            ...data,
            ...paging,
          })
        }
        ref={tableRef}
        scroll={{ x: true }}
      />
      <EditDealerModal ref={dealerModalRef} reload={reload} />
      <OperationArea>
        <Button type="primary" icon={<Icons type="plus" />} className="customBtn" onClick={addDealer}>
          添加经销商
        </Button>
      </OperationArea>
    </>
  );
}

export default SpecialDealer;
