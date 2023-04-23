import React, { useState, useRef } from 'react';
import { useTableRef } from '@/utils/hooks';
import CCForm from '@/components/CCForm';
import CCStoreTable from '@/components/CCStoreTable';
import CCFormModal from '@/components/CCFormModal';
import formItemList from './formItems';
import { todoColumns } from './columns';

function TodoPage() {
  const [list, setList] = useState([]);
  const [record, setRecord] = useState({});
  const [tableRef, handleSearch] = useTableRef();
  const removeModalRef = useRef();

  const selectedIds = useRef([]);

  const removeMultipleFunc = (selectedRowKeys) => {
    let whareHouseId = '';
    selectedRowKeys.forEach((tmp) => {
      list.forEach((item) => {
        if (item.id === tmp) {
          if (whareHouseId === '') {
            whareHouseId = item.whareHouseId;
          } else {
            if (whareHouseId != item.whareHouseId) {
              message.error('请选择相同二网批量解除');
              return;
            }
          }
        }
      });
    });
    showRemoveModal(selectedRowKeys)();
  };
  const showRemoveModal = (ids) => () => {
    if (!Array.isArray(ids) || ids.length === 0) {
      message.error('请至少选择一条要解除的数据');
      return;
    }
    selectedIds.current = ids;
    const _record = list.find((item) => item.id === ids[0]);
    setRecord(_record);
    removeModalRef.current.show();
  };
  const onModalFormSubmit = async (formData) => {
    const params = {
      ids: selectedIds.current,
      newNumber: formData.newNumber,
      remark: formData.remark,
      whareHouseId: record.whareHouseId,
      oldNumber: record.recognitionCarNum,
    };
    return httpCommonClient.post('/WhareHouseAction_removeWarning', params);
  };
  const operationColumn = {
    title: '操作',
    dataIndex: 'operation',
    width: 80,
    fixed: 'right',
    render: (text, record) => <a onClick={showRemoveModal([record.id])}>解除</a>,
  };
  return (
    <>
      <CCForm group={formItemList} onSearch={handleSearch} formKey={'repositoryWarning-todo'} />
      <CCStoreTable
        columns={[...todoColumns, operationColumn]}
        ref={tableRef}
        tableKey={'repositoryWarning-todo'}
        formKey={'repositoryWarning-todo'}
        rowKey={'id'}
        rowSelection={{
          operName: '批量解除',
          operFunc: removeMultipleFunc,
        }}
        tableList={setList}
        fetchFunc={(data, paging) =>
          httpCommonClient.post('/WhareHouseAction_getWarning', {
            ...data,
            isRemove: 0,
            ...paging,
          })
        }
      />
      <CCFormModal
        title={'解除预警'}
        ref={removeModalRef}
        onFinal={handleSearch}
        onSubmit={onModalFormSubmit}
        record={record}
        configList={[
          {
            label: '库存车识别数量',
            type: 'label',
            key: 'recognitionCarNum',
          },
          {
            label: '库存车实际数量',
            type: 'inputNumber',
            key: 'newNumber',
            required: true,
          },
          {
            label: '解除备注',
            type: 'input',
            key: 'remark',
            required: true,
          },
        ]}
      />
    </>
  );
}

export default TodoPage;
