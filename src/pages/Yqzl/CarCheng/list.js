import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 橙E格式导入记录 } from '../formItems';
import { chengColumns } from '../columns';
export default class list extends Component {
  tableRef = React.createRef();
  render() {
    return (
      <>
        <CCForm group={橙E格式导入记录} formKey={'/carChengType/list'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/carChengType/list'}
          formKey={'/carChengType/list'}
          columns={chengColumns}
          fetchFunc={(data, paging) =>
            httpCommonClient.submit('/CarDataUploadAction_listRecord', { fileType: '1', ...data, ...paging })
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
