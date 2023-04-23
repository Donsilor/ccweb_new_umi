import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 车辆赎回导入记录 } from '../formItems';
export default class list extends Component {
  tableRef = React.createRef();
  render() {
    return (
      <>
        <CCForm group={车辆赎回导入记录} formKey={'/carReturnType/list'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/carReturnType/list'}
          formKey={'/carReturnType/list'}
          columns={columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.submit('/CarDataUploadAction_listRecord', { fileType: '3', ...data, ...paging })
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
const columns = [
  { title: '银行名称', dataIndex: 'bankName' },
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '车架号', dataIndex: 'chassis' },
  { title: '状态', dataIndex: 'statusName' },
  { title: '录入时间', dataIndex: 'lrtime' },
  { title: '最后处理时间', dataIndex: 'handletime' },
  { title: '备注', dataIndex: 'remark' },
];
