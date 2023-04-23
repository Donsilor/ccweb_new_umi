import React, { Component } from 'react';
import { Button } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import OperationArea from '@/layouts/OperationArea';
import CCFormModal from '@/components/CCFormModal';
import { 车辆明细对邮箱维护 } from '../formItems';
import _ from 'lodash';
export default class list extends Component {
  tableRef = React.createRef();
  modModal = React.createRef();
  state = {
    record: {},
  };
  columns = [
    { title: '经销商名称', dataIndex: 'distributorName' },
    { title: '邮箱地址', dataIndex: 'email' },
    {
      title: '操作',
      render: (text, record) => (
        <a
          onClick={() => {
            this.setState({ record });
            this.modModal.current.show();
          }}
        >
          修改
        </a>
      ),
    },
  ];
  render() {
    const { record } = this.state;
    return (
      <>
        <CCForm group={车辆明细对邮箱维护} formKey={'/carAccount/emailList'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/carAccount/emailList'}
          formKey={'/carAccount/emailList'}
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/self-car/v1.0/tDistributorEmail/find/searchDistributorEmailList', data, paging)
          }
          ref={this.tableRef}
        />
        <CCFormModal
          title={`${_.isEmpty(record) ? '新增' : '修改'}`}
          ref={this.modModal}
          onFinal={() => {
            this.tableRef.current.reload();
          }}
          onSubmit={(formData) => {
            let data = {
              distributorName: formData.distributorName,
              email: formData.email,
            };
            if (!_.isEmpty(record)) data.id = record.id;
            return httpCommonClient.post(
              `${
                _.isEmpty(record)
                  ? '/self-car/v1.0/tDistributorEmail/add/saveDistributorEmailInfo'
                  : '/self-car/v1.0/tDistributorEmail/update/updateDistributorEmailInfo'
              }`,
              data,
            );
          }}
          configList={[
            {
              label: '经销商名称',
              type: 'input',
              key: 'distributorName',
              initialvalue: record.distributorName,
              required: true,
            },
            {
              label: '邮箱地址',
              type: 'input',
              key: 'email',
              initialvalue: record.email,
              required: true,
            },
          ]}
        />
        <OperationArea>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ record: {} });
              this.modModal.current.show();
            }}
          >
            新增
          </Button>
        </OperationArea>
      </>
    );
  }
}
