import React, { Component } from 'react';
import { connect } from 'umi';
import _get from 'lodash/get';
import { Button } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 车辆明细上报 } from '../formItems';
import { exportFile } from '@/utils';

class View extends Component {
  tableRef = React.createRef();
  state = {
    isExporting: false,
  };
  columns = [
    { title: '经销商名称', dataIndex: 'custname' },
    { title: '标识', dataIndex: 'identification' },
    { title: '业务编号', dataIndex: 'bizno' },
    { title: '凭证号', dataIndex: 'voucherno' },
    { title: '创建时间', dataIndex: 'createtime' },
  ];
  render() {
    const { isExporting } = this.state;
    return (
      <>
        <CCForm group={车辆明细上报} onSearch={() => this.tableRef.current.reload()} formKey={'/CarAction_Dis/list'} />
        <CCStoreTable
          columns={this.columns}
          tableKey={'/CarAction_Dis/list'}
          formKey={'/CarAction_Dis/list'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/sync/show/list/car/send/dealer',
              { custname: this.props.userInfo.departname, ...data },
              paging,
            )
          }
          ref={this.tableRef}
        />
        <OperationArea>
          <Button
            type="primary"
            loading={isExporting}
            onClick={() => {
              const hide = message.loading('导出中，请稍后。。。', 0);
              this.setState({ isExporting: true });
              httpBufferClient
                .submit('/warning/v1.0/sync/show/export/car/send/dealer', {
                  ...this.props.value,
                  custname: this.props.userInfo.departname,
                })
                .then((payload) => {
                  const result = exportFile(payload);
                  result && message.warning(result, 2.5);
                })
                .then((res) => {
                  this.setState({ isExporting: false });
                  hide();
                })
                .catch((err) => {
                  message.error('系统异常');
                  this.setState({ isExporting: false });
                  hide();
                });
            }}
          >
            报表导出
          </Button>
        </OperationArea>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    userInfo: _get(store.common, `userInfo`),
    value: _get(store.form, `value./CarAction_Dis/list`),
  };
};
export default connect(mapStateToProps)(View);
