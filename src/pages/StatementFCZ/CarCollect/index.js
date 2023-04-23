import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import { collectColumns } from '../Columns';

export default class CarCollectFCZ extends Component {
  tableRef = React.createRef();
  state = {};
  handleSearch = () => {
    this.tableRef.current.reload();
  };
  componentDidMount() {
    this.handleSearch();
  }
  render() {
    return (
      <div>
        <CCStoreTable
          columns={collectColumns}
          tableKey={'CarCollectFCZ'}
          formKey={'CarCollectFCZ'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/fangcheCarDetail/list', data, paging)
          }
          ref={this.tableRef}
        />
      </div>
    );
  }
}
