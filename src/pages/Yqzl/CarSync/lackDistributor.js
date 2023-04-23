import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';

export default class View extends Component {
  tableRef = React.createRef();
  componentDidMount() {
    this.tableRef.current.reload();
  }
  render() {
    return (
      <>
        <CCStoreTable
          columns={[
            { title: '客户名称', dataIndex: 'custname' },
            { title: '创建时间', dataIndex: 'createtime' },
          ]}
          tableKey={'/carSync/lackDistributor'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/distributor/lack', data, paging)
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
