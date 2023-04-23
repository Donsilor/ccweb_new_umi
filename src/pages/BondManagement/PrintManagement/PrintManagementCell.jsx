import React, { Component, Fragment } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCModalTable from '@/components/CCModalTable';
import Icon from '@/components/Icon';
import saveAs from 'file-saver';
import _ from 'lodash';
import { Divider, Tooltip } from 'antd';
import { exportDataFunc } from './index';

import { pmModalColumnList } from '../columns';
import AccountInfoModalForm from '@/pages/BondManagement/ConfirmReceipt/AccountInfoModalForm.jsx';
import last from 'lodash/last';

class PrintManagementCell extends Component {
  state = {
    record: null,
  };
  exportLoading = false;
  tableRef = React.createRef();
  modalRef = React.createRef();
  accountInfoModalFormRef = React.createRef();
  reload = () => {
    this.tableRef.current?.reload();
  };
  handleSearchEwList = () => {};
  searchEwDetail = (record) => (e) => {
    this.setState(
      {
        record: record,
      },
      () => {
        this.handleSearchEwList().then(() => {
          this.setState({
            showModal: true,
          });
        });
      },
    );
  };
  // 该方法只有转出tab需要
  exportRowForTransferOutTab = (record) => (e) => {
    if (!record || this.exportLoading) return;
    const hide = message.loading('导出中，请稍后', 0);
    this.exportLoading = true;
    const params = _.pick(record, [
      'bankId',
      'brandId',
      'distributorId',
      'distributorName',
      'depositTotal',
      'settlementAccount',
      'bondAccount',
      'pointsAccount',
    ]);
    exportDataFunc('/BondPrintAction_exportBondTurnOut', params).then(() => {
      hide();
      this.exportLoading = false;
    });
  };
  showModalForm = (record) => (e) => {
    if (!record) return;
    this.modalRef.current?.show(record);
  };
  showAccountModalForm = (record) => (e) => {
    if (!record) return;
    this.accountInfoModalFormRef.current?.show(record);
  };
  renderColumns = () => {
    const { columns, tableKey } = this.props;
    const _columns = columns.slice();
    _columns.push({
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 60,
      render: (text, record) => {
        if (tableKey === 'transferOut') {
          return (
            <Fragment>
              <Tooltip title="查看">
                <a onClick={this.showModalForm(record)}>
                  <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
                </a>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="账户设置">
                <a className={'operButton'} onClick={this.showAccountModalForm(record)}>
                  <Icon type="user-add" style={{ color: '#40a9ff' }} />
                </a>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="导出">
                <a onClick={this.exportRowForTransferOutTab(record)}>
                  <Icon type="export" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
                </a>
              </Tooltip>
            </Fragment>
          );
        } else if (tableKey === 'transferOutHis') {
          return (
            <Fragment>
              <Tooltip title="导出">
                <a href={record && record.filePath} target="_blank" download rel="noreferrer">
                  <Icon type="export" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
                </a>
              </Tooltip>
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <Tooltip title="查看">
                <a onClick={this.showModalForm(record)}>
                  <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
                </a>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="账户设置">
                <a className={'operButton'} onClick={this.showAccountModalForm(record)}>
                  <Icon type="user-add" style={{ color: '#40a9ff' }} />
                </a>
              </Tooltip>
            </Fragment>
          );
        }
      },
    });
    return _columns;
  };

  render() {
    const { tableKey, url } = this.props;
    return (
      <>
        <CCStoreTable
          columns={this.renderColumns()}
          tableKey={tableKey}
          formKey={'printManagement'}
          ref={this.tableRef}
          fetchFunc={(data, paging) => httpFormClient.formSubmit(url, 'bpQuery', data, paging)}
          rowKey={tableKey === 'transferOutHis' ? 'id' : (record) => `${record.bankId},${record.brandId},${record.distributorId}`}
        />
        <CCModalTable
          ref={this.modalRef}
          title={'二网信息'}
          footer={null}
          columns={pmModalColumnList}
          tableFilter={ewListTableFilter}
          fetchFunc={(data, paging) => httpFormClient.formSubmit('/BondPrintAction_getEwList', 'ebQuery', data, paging)}
        />
        <AccountInfoModalForm ref={this.accountInfoModalFormRef} reload={this.reload} />
      </>
    );
  }
}

function ewListTableFilter(record) {
  const { bankId, brandId, distributorId } = record;
  return {
    bankId,
    fldSerialid: brandId,
    distributorId,
  };
}

export default PrintManagementCell;
