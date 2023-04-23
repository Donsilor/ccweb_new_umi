import React, { Component } from 'react';
import { Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
export default class details extends Component {
  tableRef = React.createRef();
  componentDidMount() {
    this.tableRef.current.reload();
  }
  render() {
    return (
      <Modal title="查看明细" width="90%" onCancel={() => this.props.onCancel()} visible footer={null}>
        <CCStoreTable
          tableKey={'/CarAction_Dis/detail'}
          ref={this.tableRef}
          columns={columnsCar}
          fetchFunc={(data, paging) =>
            httpCommonClient.submit('/CarUnsupervisedDisAction_list', { batchno: this.props.record.batchno, ...paging })
          }
        />
      </Modal>
    );
  }
}
const columnsCar = [
  { title: '经销商名称', dataIndex: 'distributorName' },
  { title: '车架号', dataIndex: 'chassis' },
  { title: '金额（元）', dataIndex: 'carprice' },
  { title: '车辆状态', dataIndex: 'carStatus' },
  { title: '备注', dataIndex: 'location' },
  { title: '地址', dataIndex: 'address' },
];
