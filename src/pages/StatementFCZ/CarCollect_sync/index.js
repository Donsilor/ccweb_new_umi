import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 车辆汇总表, 供应链名称, 监管方 } from '../formItems';
import { collectColumns } from '../Columns';
import { exportFile } from '@/utils';

export default class CarCollectFCZ extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
    supervisor: [],
    supplyChain: [],
  };
  componentDidMount() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheSupervisor/list`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({ supervisor: data.data });
      }
    });
    httpCommonClient
      .postWithPaging('/warning/v1.0/warning/supplyChain/list', {}, { pageNum: 1, pageSize: 500 })
      .then(({ data = {} }) => {
        this.setState({ supplyChain: data.data.list });
      });
  }
  render() {
    const { supervisor, supplyChain, isExporting } = this.state;
    return (
      <>
        <CCForm
          group={[...车辆汇总表, 供应链名称(supplyChain), 监管方(supervisor)]}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'collectFCZ_sync'}
          enableExport
          isExporting={isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/fangche/fangcheCarDetail/sync/export', value)
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
          columns={collectColumns}
          tableKey={'collectFCZ_sync'}
          formKey={'collectFCZ_sync'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/fangcheCarDetail/sync/list', data, paging)
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
