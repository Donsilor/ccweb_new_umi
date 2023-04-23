import React, { Component } from 'react';
import CCTable from '@/components/CCTable';
export default class record extends Component {
  tableRef = React.createRef();
  columns = [
    { title: '操作人', dataIndex: 'userName' },
    { title: '操作时间', dataIndex: 'createtime' },
    { title: '操作内容', dataIndex: 'operationContent' },
  ];
  componentDidMount() {
    this.tableRef.current.reload();
  }
  render() {
    return (
      <>
        <CCTable
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/fangche/vehicleStatusTracking/list/record',
              { id: this.props.record.id },
              paging,
            )
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
