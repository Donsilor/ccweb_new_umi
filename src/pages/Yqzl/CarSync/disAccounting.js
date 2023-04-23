import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCModalTable from '@/components/CCModalTable';
import CCForm from '@/components/CCForm';
import { 数据同步经销商出账信息 } from '../formItems';
import { 数据同步经销商出账 } from '../columns';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    isExporting: false,
  };
  columns = [
    ...数据同步经销商出账,
    {
      fixed: 'right',
      title: '操作',
      render: (text, record) => (
        <a
          onClick={() => {
            this.modalRef.current?.show({ bizno: record.bizno });
          }}
        >
          查看更新明细
        </a>
      ),
    },
  ];
  render() {
    return (
      <>
        <CCForm
          group={数据同步经销商出账信息}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/disAccounting'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/distributor/accounting', value)
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
          tableKey={'/carSync/disAccounting'}
          formKey={'/carSync/disAccounting'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/distributor/accounting', data, paging)
          }
          ref={this.tableRef}
        />
        <CCModalTable
          ref={this.modalRef}
          title={'查看更新明细'}
          footer={null}
          columns={columnsItem}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(`/warning/v1.0/sync/show/list/distributor/exposure`, data, paging)
          }
        />
      </>
    );
  }
}
const columnsItem = [
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '敞口余额', dataIndex: 'availexportamt' },
  {
    title: '业务类型 ',
    dataIndex: 'operType',
    render: (text) => {
      if (text == 10) {
        return '还款';
      } else if (text == 20) {
        return '赎车';
      } else {
        return '保证金调整';
      }
    },
  },
  { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
  { title: '备注', dataIndex: 'remark' },
];
