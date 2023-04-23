import React, { Component, Fragment } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import Icon from '@/components/Icon';
import { confirmReceiptFormList } from '@/pages/BondManagement/formItems';
import { confirmReceiptColumnList } from '@/pages/BondManagement/columns';
import { Divider, message, Modal, Table, Tooltip } from 'antd';
import { columnsCSin, columnsIn, columnsOut, columnsZJin } from './columns';
import AccountInfoModalForm from './AccountInfoModalForm';
import AmountModalForm from './AmountModalForm';
import _ from 'lodash';

export default class ConfirmReceipt extends Component {
  state = {
    showDetails: false,
    selectedRowKeys: [],
    record: null,
    dataSource: [],
  };

  tableRef = React.createRef();
  accountForm = React.createRef();
  amountModalForm = React.createRef();
  operColumn = {
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '90px',
    render: (text, record) => (
      <Fragment>
        <Tooltip title="查看">
          <a className="operButton" onClick={this.searchEwDetail(record)}>
            <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
          </a>
        </Tooltip>
        <Divider type="vertical" />
        <Tooltip title="账户设置">
          <a className="operButton" onClick={this.showAccountModal(record)}>
            <Icon type="user-add" style={{ color: '#40a9ff' }} />
          </a>
        </Tooltip>
        {record.confirmStatus === 0 && (
          <>
            <Divider type="vertical" />
            <Tooltip title="确认回执">
              <a
                className="operButton"
                onClick={() => {
                  if (record.bankId === '0000101') {
                    httpFormClient
                      .formSubmit('/BondPrintAction_confirmReceiptCheck', '', { exportDataId: record.id })
                      .then(({ data = {} }) => {
                        if (data.result === 0) {
                          this.amountModalForm.current.show(record);
                        } else {
                          message.error(data.msg);
                        }
                      });
                  } else {
                    this.showConfirmReceipt(record);
                  }
                }}
              >
                <Icon type="check-circle" />
              </a>
            </Tooltip>
          </>
        )}
        {record.confirmStatus !== 0 && record.bankId == '0000101' && (
          <>
            <Divider type="vertical" />
            <Tooltip title="确认详情">
              <a
                className="operButton"
                onClick={() => {
                  httpFormClient
                    .formSubmit('/BondPrintAction_getDepositFlow', '', {
                      exportDataId: record.id,
                      brandId: record.brandId,
                    })
                    .then(({ data = {} }) => {
                      if (data.result === 0) {
                        this.setState({ record, dataSource: data.list, showDetails: true });
                      } else {
                        message.error(data.msg);
                      }
                    });
                }}
              >
                <Icon type="file-search" />
              </a>
            </Tooltip>
          </>
        )}
      </Fragment>
    ),
  };

  showConfirmReceipt = (record) => {
    if (!record) {
      return;
    }
    const self = this;
    Modal.confirm({
      title: '确认回执，您要继续吗？',
      onOk() {
        self.props
          .confirmReceipt({
            id: record.id,
          })
          .then(({ data }) => {
            if (data && data.result === 0) {
              message.success('确认回执成功！', 2.5);
              self.handleSearch();
            } else {
              return Promise.reject(new Error(data.msg));
            }
          })
          .catch((err) => {
            return message.error(err.message || '确认回执失败，请重试！', 2.5);
          });
      },
    });
  };
  searchEwDetail = (record) => (e) => {
    if (!record) return;
    const { bankId, brandId, distributorId, exportHisId, confirmStatus } = record;
    if (bankId && brandId && distributorId && exportHisId) {
      const params = {
        bankId,
        brandId,
        distributorId,
        exportHisId,
        confirmStatus,
      };
      this.props.history.push('/confirmReceiptList/ewDetail', params);
    }
  };
  showAccountModal = (record) => (e) => {
    if (!record) return;
    this.accountForm.current?.show(record);
  };
  showConfirmReceipt = (record) => {
    if (!record) {
      return;
    }
    const self = this;
    Modal.confirm({
      title: '确认回执，您要继续吗？',
      onOk() {
        httpFormClient
          .formSubmit('/BondPrintAction_confirmReceipt', 'bedQuery', {
            id: record.id,
          })
          .then(({ data }) => {
            if (data.result === 0) {
              message.success('确认回执成功！', 2.5);
              self.handleSearch();
            } else {
              return Promise.reject(new Error(data.msg));
            }
          })
          .catch((err) => {
            return message.error(err.message || '确认回执失败，请重试！', 2.5);
          });
      },
    });
  };

  handleSearch = () => {
    this.tableRef.current?.reload();
  };

  handleCancel = () => {
    this.setState({
      showDetails: false,
    });
  };

  confirmMultipleItems = (selectedRowKeys) => {
    const hide = message.loading('批量确认回执中，请稍后', 0);
    httpFormClient
      .formSubmit('/BondPrintAction_confirmReceiptBt', 'bedQuery', {
        ids: selectedRowKeys.join(),
      })
      .then(({ data }) => {
        hide();
        if (data.result === 0) {
          message.success('批量确认成功', 2.5);
          this.tableRef.current.reload();
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch((err) => {
        hide();
        message.error(err || '批量确认回执失败，请重试', 2.5);
      });
  };

  render() {
    const { typeKey } = this.props;
    const additionalParams = typeKey === 'confirmReceiptTodo' ? { confirmStatus: 0 } : {};
    const { record, dataSource } = this.state;
    const dataSourceOut = dataSource.filter((item) => item.adjustType == 5);
    const dataSourceIn = dataSource.filter((item) => item.adjustType != 5);
    return (
      <>
        <CCForm group={confirmReceiptFormList} onSearch={this.handleSearch} formKey={typeKey} />
        <CCStoreTable
          columns={[...confirmReceiptColumnList, this.operColumn]}
          tableKey={typeKey}
          formKey={typeKey}
          fetchFunc={(data, paging) =>
            httpFormClient.formSubmit(
              '/BondPrintAction_getExportDataHistoryList',
              'bedQuery',
              { ...data, ...additionalParams },
              paging,
            )
          }
          ref={this.tableRef}
          rowSelection={
            typeKey === 'confirmReceiptTodo'
              ? {
                  operName: '批量确认回执',
                  operFunc: this.confirmMultipleItems,
                }
              : null
          }
          scroll={{ x: true }}
        />
        <AccountInfoModalForm ref={this.accountForm} reload={this.handleSearch} />
        <AmountModalForm ref={this.amountModalForm} reload={this.handleSearch} />
        <Modal title="确认详情" visible={this.state.showDetails} onCancel={this.handleCancel} footer={null}>
          {record && record.exportType == 5 && (
            <div>
              <Table dataSource={dataSourceOut} columns={columnsOut} pagination={false} rowKey={'id'} />
              {!_.isEmpty(dataSourceIn) && (
                <Table dataSource={dataSourceIn} columns={columnsIn} pagination={false} rowKey={'id'} />
              )}
            </div>
          )}
          {record && record.exportType != 5 && (
            <Table
              dataSource={dataSourceIn}
              columns={[3, 4].includes(record.exportType) ? columnsZJin : columnsCSin}
              pagination={false}
              rowKey={'id'}
            />
          )}
        </Modal>
      </>
    );
  }
}
