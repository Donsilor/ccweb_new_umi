import React, { Component } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import CCFormModal from '@/components/CCFormModal';
import { 品牌与车型库 } from '../formitems';
import SupplyModal from './supplyModal';
import moment from 'moment';
import _ from 'lodash';
import OperationArea from '@/layouts/OperationArea';

const { confirm } = Modal;
export default class list extends Component {
  tableRef = React.createRef();
  brandModal = React.createRef();
  cxModal = React.createRef();
  trimModal = React.createRef();
  state = {
    loading: false,
    showModal: false,
    record: {},
  };
  columns = [
    { title: '品牌名称', dataIndex: 'fld_serial' },
    { title: '供应链', dataIndex: 'supplyChains' },
    {
      title: '操作',
      width: 300,
      render: (text, record) => (
        <Space>
          <a
            onClick={() => {
              this.setState({ showModal: true, record });
            }}
          >
            关联供应链
          </a>
          <a
            onClick={() => {
              this.setState({ record });
              this.brandModal.current.show();
            }}
          >
            修改
          </a>
          <Button
            style={{ background: 'rgb(0, 127, 255)', border: 'none', color: '#fff' }}
            icon={<PlusOutlined />}
            onClick={() => {
              this.setState({ record: {}, id: record.fld_serialid });
              this.cxModal.current.show();
            }}
          >
            新增车系
          </Button>
        </Space>
      ),
    },
  ];
  //渲染二级表格
  expandedRowRender = (record) => {
    const columns = [
      { title: '车系名称', dataIndex: 'fldModel' },
      // { title: '车系类型', dataIndex: 'fldType' },
      // { title: '车系首字母归类', dataIndex: 'fldSerialchar' },
      {
        title: '操作',
        width: 300,
        render: (text, record) => (
          <Space>
            <a
              onClick={() => {
                this.setState({ record, id: record.fldSerialid });
                this.cxModal.current.show();
              }}
            >
              修改
            </a>
            <Button
              style={{ background: 'rgba(245, 154, 35, 1)', border: 'none', color: '#fff' }}
              icon={<PlusOutlined />}
              onClick={() => {
                this.setState({ record: {}, id: record.fldModelid });
                this.trimModal.current.show();
              }}
            >
              新增车型
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.state[record.fld_serialid]}
        loading={this.state.loading}
        rowKey={'fldModelid'}
        pagination={false}
        size="small"
        expandedRowRender={(record) => {
          const columns = [
            { title: '车型名称', dataIndex: 'fldTrim' },
            { title: '车型年份', dataIndex: 'fldCxnk' },
            { title: '车型价格（万元）', dataIndex: 'fldPrice' },
            {
              title: '操作',
              width: 300,
              render: (text, record) => (
                <a
                  onClick={() => {
                    this.setState({ record, id: record.fldModelid });
                    this.trimModal.current.show();
                  }}
                >
                  修改
                </a>
              ),
            },
          ];
          return (
            <Table
              columns={columns}
              dataSource={this.state[record.fldModelid]}
              loading={this.state.loading}
              rowKey={'fldTrimid'}
              pagination={false}
              size="small"
            />
          );
        }}
        onExpand={this.handleExpand2}
      />
    );
  };
  //展开二级表格
  handleExpand = (expanded, record) => {
    if (!expanded) return;
    this.setState({ loading: true });
    httpCommonClient
      .post(`/ScarserialAction_searchModelVoList`, {
        fldSerialid: record.fld_serialid || record,
      })
      .then(({ data }) => {
        this.setState({ [record.fld_serialid || record]: data.list, loading: false });
      });
  };
  //展开三级表格
  handleExpand2 = (expanded, record) => {
    if (!expanded) return;
    this.setState({ loading: true });
    httpCommonClient
      .post(`/ScarserialAction_searchTrimVoList`, {
        fldModelid: record.fldModelid || record,
      })
      .then(({ data }) => {
        this.setState({ [record.fldModelid || record]: data.list, loading: false });
      });
  };

  render() {
    const { record } = this.state;
    return (
      <>
        <CCForm group={品牌与车型库} formKey={'/brandModel'} onSearch={() => this.tableRef.current.reload()} />
        <OperationArea>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              this.setState({ record: {} });
              this.brandModal.current.show();
            }}
          >
            新增品牌
          </Button>
        </OperationArea>
        <CCStoreTable
          rowKey={'fld_serialid'}
          tableKey={'/brandModel'}
          formKey={'/brandModel'}
          columns={this.columns}
          fetchFunc={(data) => httpCommonClient.submit('/ScarserialAction_searchBrandVoList', data)}
          ref={this.tableRef}
          pagination={false}
          expandedRowRender={this.expandedRowRender}
          onExpand={this.handleExpand}
        />
        <CCFormModal
          title={`${_.isEmpty(record) ? '新增' : '修改'}品牌`}
          ref={this.brandModal}
          onFinal={() => this.tableRef.current.reload()}
          onSubmit={(formData) => {
            let data = { fld_serial: formData.fld_serial };
            if (!_.isEmpty(record)) data = { fld_serial: formData.fld_serial, fld_serialid: record.fld_serialid };
            return httpCommonClient.post(
              `${_.isEmpty(record) ? '/ScarserialAction_addBrand' : '/ScarserialAction_updateBrand'}`,
              { fld_serial: formData.fld_serial, fld_serialid: record.fld_serialid },
            );
          }}
          configList={[
            {
              label: '品牌名称',
              type: 'input',
              key: 'fld_serial',
              initialvalue: record.fld_serial,
              required: true,
              maxLength: 20,
            },
          ]}
        />
        <CCFormModal
          title={`${_.isEmpty(record) ? '新增' : '修改'}车系`}
          ref={this.cxModal}
          onFinal={() => {
            this.handleExpand(true, this.state.id);
          }}
          onSubmit={(formData) => {
            let data = {
              fldSerialid: this.state.id,
              fldModel: formData.fldModel,
              fldType: formData.fldType,
              fldSerialchar: formData.fldSerialchar,
            };
            if (!_.isEmpty(record)) data.fldModelid = record.fldModelid;
            return httpCommonClient.post(
              `${_.isEmpty(record) ? '/ScarserialAction_addModel' : '/ScarserialAction_updateModel'}`,
              data,
            );
          }}
          configList={[
            {
              label: '车系名称',
              type: 'input',
              key: 'fldModel',
              initialvalue: record.fldModel,
              required: true,
              maxLength: 20,
            },
            // {
            //   label: '车系类型',
            //   type: 'input',
            //   key: 'fldType',
            //   initialvalue: record.fldType,
            // },
            // {
            //   label: '车系首字母归类',
            //   type: 'input',
            //   key: 'fldSerialchar',
            //   initialvalue: record.fldSerialchar,
            // },
          ]}
        />
        <CCFormModal
          title={`${_.isEmpty(record) ? '新增' : '修改'}车型`}
          ref={this.trimModal}
          onFinal={() => {
            this.handleExpand2(true, this.state.id);
          }}
          onSubmit={(formData) => {
            let data = {
              fldModelid: this.state.id,
              fldTrim: formData.fldTrim,
              fldCxnk: formData.fldCxnk && formData.fldCxnk.format('YYYY'),
              fldPrice: formData.fldPrice,
            };
            if (!_.isEmpty(record)) data.fldTrimid = record.fldTrimid;
            return httpCommonClient.post(
              `${_.isEmpty(record) ? '/ScarserialAction_addTrim' : '/ScarserialAction_updateTrim'}`,
              data,
            );
          }}
          configList={[
            {
              label: '车型名称',
              type: 'input',
              key: 'fldTrim',
              initialvalue: record.fldTrim,
              required: true,
              maxLength: 20,
            },
            {
              label: '车型年份',
              type: 'datePicker',
              key: 'fldCxnk',
              picker: 'year',
              format: 'YYYY',
              initialvalue: record.fldCxnk ? moment(record.fldCxnk) : null,
              required: true,
            },
            {
              label: '车型价格(万元)',
              type: 'inputNumber',
              key: 'fldPrice',
              initialvalue: record.fldPrice,
              required: true,
            },
          ]}
        />
        {this.state.showModal && (
          <SupplyModal
            record={record}
            onCancel={() => {
              this.setState({ showModal: false });
              this.tableRef.current.reload();
            }}
          />
        )}
      </>
    );
  }
}
