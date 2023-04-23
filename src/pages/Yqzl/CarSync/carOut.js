import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 数据同步赎车明细 } from '../formItems';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  columns = [
    { title: '车架号', dataIndex: 'vin' },
    { title: '全底盘号', dataIndex: 'chassisno' },
    { title: '业务编号', dataIndex: 'bizno' },
    { title: '创建时间', dataIndex: 'createtime' },
    { title: '经销商名称', dataIndex: 'custname' },
    { title: '释放时间', dataIndex: 'repaydate' },
    { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
    { title: '备注', dataIndex: 'remark' },
  ];
  render() {
    return (
      <>
        <CCForm
          group={数据同步赎车明细}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/carOut'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/car/in/out', { carType: 'sync_car_type_2', ...value })
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
          columns={this.columns}
          tableKey={'/carSync/carOut'}
          formKey={'/carSync/carOut'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/sync/show/list/car/in/out',
              { carType: 'sync_car_type_2', ...data },
              paging,
            )
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
