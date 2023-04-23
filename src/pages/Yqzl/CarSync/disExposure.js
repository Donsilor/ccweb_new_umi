import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 数据同步单笔业务敞口更新 } from '../formItems';
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
          group={数据同步单笔业务敞口更新}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/disExposure'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/distributor/exposure', value)
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
          tableKey={'/carSync/disExposure'}
          formKey={'/carSync/disExposure'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/distributor/exposure', data, paging)
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
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '敞口余额', dataIndex: 'availexportamt' },
  {
    title: '业务类型 ',
    dataIndex: 'operType',
    render: (text) => {
      if (text == '10') {
        return '还款';
      } else if (text == '20') {
        return '赎车';
      } else {
        return '保证金调整';
      }
    },
  },
  { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
  { title: '备注', dataIndex: 'remark' },
];
