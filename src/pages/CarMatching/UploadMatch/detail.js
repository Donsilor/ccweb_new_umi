import React, { Component } from 'react';
import { Modal } from 'antd';
import CCForm from '@/components/CCForm';
import CCStoreTable from '@/components/CCStoreTable';
import { 推送车辆导入查看 } from '../formItems';
const { confirm } = Modal;
export default class View extends Component {
  tableRef = React.createRef();
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
    {
      title: '操作',
      fixed: 'right',
      render: (text, record) =>
        !record.syncFlag && (
          <a
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否删除该条数据?',
                onOk() {
                  httpCommonClient
                    .post(`/warning/v1.0/matching/matchingCarBill/delete`, { id: record.id })
                    .then(({ data = {} }) => {
                      if (data.code === 200) {
                        message.success(data.message);
                      } else {
                        message.error(data.message);
                      }
                      self.tableRef.current.reload();
                    });
                },
              });
            }}
          >
            删除
          </a>
        ),
    },
  ];
  render() {
    return (
      <>
        <CCForm group={推送车辆导入查看} onSearch={() => this.tableRef.current.reload()} formKey={'pushMatchUpload/detail'} />
        <CCStoreTable
          columns={this.columns}
          formKey={'pushMatchUpload/detail'}
          tableKey={'pushMatchUpload/detail'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/matching/matchingCarBill/list',
              { importRecordId: this.props.record.id, ...data },
              paging,
            )
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
