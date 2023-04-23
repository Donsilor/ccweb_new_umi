import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCModalTable from '@/components/CCModalTable';
import CCForm from '@/components/CCForm';
import { 数据同步经销商贸易商列表 } from '../formItems';
import { 数据同步经销商, 数据同步经销商出账 } from '../columns';
import { Space } from 'antd';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  modalRef1 = React.createRef();
  modalRef2 = React.createRef();
  state = {};
  render() {
    return (
      <>
        <CCForm
          group={数据同步经销商贸易商列表}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/carSync/trader'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/sync/show/export/distributor/trader', value)
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
          columns={[
            { title: '经销商名称 ', dataIndex: 'custname' },
            { title: '贸易商名称 ', dataIndex: 'tradername' },
            { title: '实时总敞口 ', dataIndex: 'availexportamt' },
            {
              fixed: 'right',
              title: '操作',
              render: (text, record) => (
                <Space>
                  <a
                    onClick={() => {
                      this.modalRef1.current?.show({ custname: record.custname, tradername: record.tradername });
                    }}
                  >
                    查看更新明细
                  </a>
                  <a
                    onClick={() => {
                      this.modalRef2.current?.show({ custname: record.custname, tradername: record.tradername });
                    }}
                  >
                    查看票据明细
                  </a>
                </Space>
              ),
            },
          ]}
          tableKey={'/carSync/trader'}
          formKey={'/carSync/trader'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/sync/show/list/distributor/trader', data, paging)
          }
          ref={this.tableRef}
        />
        <CCModalTable
          width="80%"
          ref={this.modalRef1}
          title={'查看更新明细'}
          footer={null}
          columns={[
            { title: '更新时间', dataIndex: 'createtime' },
            ...数据同步经销商.filter((v) => !['实时总敞口'].includes(v.title)),
          ]}
          fetchFunc={(data, paging) => httpCommonClient.post(`/warning/v1.0/sync/show/list/distributor/record`, data, paging)}
          pagination={false}
        />
        <CCModalTable
          width="80%"
          ref={this.modalRef2}
          title={'查看票据明细'}
          footer={null}
          columns={数据同步经销商出账}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(`/warning/v1.0/sync/show/list/distributor/accounting`, data, paging)
          }
        />
      </>
    );
  }
}
