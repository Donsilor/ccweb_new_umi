import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 航信对接数据 } from '../formItems';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  render() {
    return (
      <>
        <CCForm
          group={航信对接数据}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/hxInvoice'}
          enableExport
          isExporting={this.state.isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/self-car/v1.0/carInvoice/export/exportInputInvoiceData', value)
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
          rowKey="guid"
          columns={columns}
          tableKey={'/hxInvoice'}
          formKey={'/hxInvoice'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/self-car/v1.0/carInvoice/find/searchInputInvoiceList', data, paging)
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
const columns = [
  { title: '经销商 ', dataIndex: 'distributorName' },
  { title: '发票代码', dataIndex: 'fpdm' },
  { title: '发票号码', dataIndex: 'fphm' },
  { title: '开票日期', dataIndex: 'kprq' },
  { title: '发票类型', dataIndex: 'fplxdm' },
  { title: '货物或应税劳务、服务名称', dataIndex: 'spmc' },
  { title: '购货方发票抬头', dataIndex: 'gmfmc' },
  { title: '价税合计', dataIndex: 'jshj' },
  { title: '车辆类型 ', dataIndex: 'cllx' },
  { title: '厂牌型号 ', dataIndex: 'cpxh' },
  { title: '车架号', dataIndex: 'chassis' },
  { title: '红蓝票标识', dataIndex: 'hlpbs' },
  { title: '获取时间', dataIndex: 'createTime' },
  { title: '发票状态', dataIndex: 'fpzt' },
];
