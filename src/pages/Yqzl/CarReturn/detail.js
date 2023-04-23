import React, { Component } from 'react';
import { Button } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import OperationArea from '@/layouts/OperationArea';
import { exportFile } from '@/utils';
import { returnColumns } from '../columns';
import { 车辆赎回详情 } from '../formItems';
export default class Detail extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  //导出
  handleExport = (values) => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({ isExporting: true });
    httpBufferClient
      .post('/CarDataUploadAction_exportItem', { ...values, batchno: this.props.match.params.id })
      .then((payload) => {
        exportFile(payload);
      })
      .then((res) => {
        this.setState({ isExporting: false });
        hide();
      })
      .catch((err) => {
        message.error('系统异常！');
      });
  };
  render() {
    return (
      <>
        <CCForm
          group={车辆赎回详情}
          formKey={'/carReturnType/detail'}
          onSearch={() => this.tableRef.current.reload()}
          enableExport
          onExport={this.handleExport}
          isExporting={this.state.isExporting}
        />
        <CCStoreTable
          tableKey={'/carReturnType/detail'}
          formKey={'/carReturnType/detail'}
          columns={returnColumns}
          fetchFunc={(data, paging) =>
            httpCommonClient.submit('/CarDataUploadAction_listItem', { batchno: this.props.match.params.id, ...data, ...paging })
          }
          ref={this.tableRef}
        />
        <OperationArea>
          <Button onClick={() => this.props.history.push('/carReturnType/upload')}>返回</Button>
        </OperationArea>
      </>
    );
  }
}
