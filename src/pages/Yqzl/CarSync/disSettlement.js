import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 数据同步单笔业务到期结清 } from '../formItems';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  render() {
    return (
      <>
        <CCForm
          group={数据同步单笔业务到期结清}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/disSettlement'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/distributor/settlement', value)
              .then((payload) => {
                const result = exportFile(payload);
                result && message.warning(result, 2.5);
              })
              .then((res) => {
                this.setState({ isExporting: false });
              })
              .catch((err) => {
                message.error('系统异常');
                this.setState({ isExporting: false });
              });
          }}
        />
        <CCStoreTable
          columns={columns}
          tableKey={'/carSync/disSettlement'}
          formKey={'/carSync/disSettlement'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/distributor/settlement', data, paging)
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
const columns = [
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
  { title: '备注', dataIndex: 'remark' },
];
