import React, { Component } from 'react';
import { Button } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import OperationArea from '@/layouts/OperationArea';
import { 车辆明细对账发送结果 } from '../formItems';
export default class Detail extends Component {
  tableRef = React.createRef();
  columns = [
    { title: '经销商名称', dataIndex: 'distributorName' },
    { title: '邮箱地址', dataIndex: 'email' },
    {
      title: '发送结果',
      dataIndex: 'sendResultType',
      render: (text) => {
        if (text === 0) {
          return '失败';
        } else if (text === 1) {
          return '成功';
        }
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <a
          onClick={() => {
            let a = document.createElement('a');
            a.href = record.fileUrl;
            a.click();
          }}
        >
          下载
        </a>
      ),
    },
  ];
  render() {
    return (
      <>
        <CCForm group={车辆明细对账发送结果} formKey={'/carAccount/detail'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/carAccount/detail'}
          formKey={'/carAccount/detail'}
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/self-car/v1.0/tDisFileRecordDetail/find/searchDisFileRecordDetailList',
              { id: this.props.match.params.id, ...data },
              paging,
            )
          }
          ref={this.tableRef}
        />
        <OperationArea>
          <Button onClick={() => this.props.history.push('/carAccount/accList')}>返回</Button>
        </OperationArea>
      </>
    );
  }
}
