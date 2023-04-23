import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 推送车辆明细 } from './formItems';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  columns = [
    { title: '导入时间', dataIndex: 'importDate' },
    { title: '供应链', dataIndex: 'supplyChain' },
    { title: '经销商名称', dataIndex: 'custname' },
    { title: '业务编号', dataIndex: 'businesslogno' },
    { title: '押品名称(车型)', dataIndex: 'goodsname' },
    { title: 'VIN码', dataIndex: 'goodsidnumber' },
    { title: '合格证编号', dataIndex: 'goodsvouchernumber' },
    { title: '金额（元）', dataIndex: 'goodsprice' },
    { title: '情况', dataIndex: 'reason' },
    { title: '押品代码', dataIndex: 'goodsno' },
    {
      title: '推送状态',
      dataIndex: 'syncFlag',
      render: (text) => (text ? `已推送` : `未推送`),
    },
    { title: '推送时间', dataIndex: 'syncTime' },
  ];
  render() {
    return (
      <>
        <CCForm
          group={推送车辆明细}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'pushMatchList'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/matching/matchingCarBill/export', value)
              .then((payload) => {
                exportFile(payload);
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
          columns={this.columns}
          formKey={'pushMatchList'}
          tableKey={'pushMatchList'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/matching/matchingCarBill/list', data, paging)
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
