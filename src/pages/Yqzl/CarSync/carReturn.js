import React, { Component } from 'react';
import { Button } from 'antd';
import _get from 'lodash/get';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import OperationArea from '@/layouts/OperationArea';
import CCFormModal from '@/components/CCFormModal';
import { 数据同步发车明细 } from '../formItems';
import { exportFile } from '@/utils';

export default class View extends Component {
  tableRef = React.createRef();
  modModal = React.createRef();
  state = {
    showModal: false,
    isExporting: false,
  };
  render() {
    return (
      <>
        <CCForm
          group={数据同步发车明细}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/carReturn'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/car/return', value)
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
          tableKey={'/carSync/carReturn'}
          formKey={'/carSync/carReturn'}
          fetchFunc={(data, paging) => httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/car/return', data, paging)}
          ref={this.tableRef}
        />
        <OperationArea>
          <Button type="primary" onClick={() => this.modModal.current.show()}>
            获取退货明细
          </Button>
        </OperationArea>
        <CCFormModal
          ref={this.modModal}
          title={`获取明细`}
          onFinal={() => {
            this.setState({ modModal: false });
            this.tableRef.current.reload();
          }}
          onSubmit={(formData) => {
            return httpCommonClient.post(`/warning/v1.0/sync/show/list/return`, formData);
          }}
          configList={[
            {
              label: '车架号',
              type: 'input',
              key: 'vin',
            },
          ]}
        />
      </>
    );
  }
}
const columns = [
  { title: '全底盘号', dataIndex: 'chassisno' },
  { title: '批次号', dataIndex: 'batchNo' },
  { title: '贷款编号或票号', dataIndex: 'billloanno' },
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '实际发运日期', dataIndex: 'actualdeparttime' },
  { title: '到店时间', dataIndex: 'arrivaltime' },
  { title: '押品名称', dataIndex: 'collname' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '始发地', dataIndex: 'departplace' },
  { title: '接收地址', dataIndex: 'destination' },
  { title: '出厂时间', dataIndex: 'fatoryDate' },
  { title: '预计到店时间', dataIndex: 'goodsintime' },
  { title: '车辆出库时间', dataIndex: 'goodsouttime' },
  { title: '标识', dataIndex: 'identification' },
  { title: '核心厂商发货时间', dataIndex: 'inputdate' },
  { title: '推送备注信息', dataIndex: 'note' },
  { title: '发车时间', dataIndex: 'outputdate' },
  { title: '供应链名称', dataIndex: 'tradername' },
  { title: '单价', dataIndex: 'unitprice' },
  { title: '凭证号', dataIndex: 'voucherno' },
  {
    title: '处理状态',
    dataIndex: 'status',
    render: (text) => {
      if (text == '0') {
        return '待处理';
      } else if (text == '1') {
        return '已处理';
      } else {
        return '重复数据无需处理';
      }
    },
  },
  { title: '备注', dataIndex: 'remark' },
];
