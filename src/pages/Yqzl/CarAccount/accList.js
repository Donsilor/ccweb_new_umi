import React, { Component } from 'react';
import { Space, Upload, Button, Modal } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCStoreTable from '@/components/CCStoreTable';
import CCModalTable from '@/components/CCModalTable';
import CCForm from '@/components/CCForm';
import { 车辆明细对账明细 } from '../formItems';
const { confirm } = Modal;
export default class list extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    loading: false,
  };
  columns = [
    { title: '文件名', dataIndex: 'fileName' },
    { title: '上传时间', dataIndex: 'uploadTime' },
    {
      title: '上传状态',
      dataIndex: 'uploadStatus',
      render: (text) => {
        if (text === 0) {
          return '失败';
        } else if (text === 1) {
          return '成功';
        }
      },
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      render: (text) => {
        if (text === 1) {
          return '待发送';
        } else if (text === 2) {
          return '发送中';
        } else if (text === 3) {
          return '已处理';
        }
      },
    },
    { title: '发送成功条数', dataIndex: 'successNum' },
    { title: '发送失败条数', dataIndex: 'failNum' },
    { title: '发送时间', dataIndex: 'sendTime' },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          {record.status === 1 && (
            <a
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否发送该数据?',
                  onOk() {
                    httpCommonClient
                      .post(`/self-car/v1.0/tDisFileRecord/sendDistributorEmail`, { id: record.id, batchId: record.batchId })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.tableRef.current.reload();
                        } else {
                          message.error(data.message);
                        }
                      });
                  },
                });
              }}
            >
              发送
            </a>
          )}
          {record.uploadStatus === 0 && (
            <a
              onClick={() => {
                this.modalRef.current?.show(record);
              }}
            >
              失败原因
            </a>
          )}
          {![2, 3].includes(record.status) && (
            <a
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否删除该文件?',
                  onOk() {
                    httpCommonClient
                      .post(`/self-car/v1.0/tDisFileRecord/delete/deleteDisFileRecord`, { id: record.id })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.tableRef.current.reload();
                        } else {
                          message.error(data.message);
                        }
                      });
                  },
                });
              }}
            >
              删除
            </a>
          )}
          {record.status === 3 && (
            <a
              onClick={() => {
                this.props.history.push(`/carAccount/accList/${record.id}`);
              }}
            >
              查看
            </a>
          )}
        </Space>
      ),
    },
  ];
  render() {
    let self = this;
    const uploadConfig = {
      name: 'file',
      showUploadList: false,
      action: '/self-car/v1.0/tDisFileRecord/upload/executeUploadFileData',
      accept: '.xlsx',
      onChange(info) {
        self.setState({ loading: true });
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              message.success('上传成功');
            } else {
              message.error(info.file.response.message);
            }
            self.tableRef.current.reload();
            self.setState({ loading: false });
          }
        } else if (info.file.status === 'error') {
          self.setState({ loading: false });
          message.error(`系统异常`);
        }
      },
    };
    return (
      <>
        <CCForm group={车辆明细对账明细} formKey={'/carAccount/accList'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/carAccount/accList'}
          formKey={'/carAccount/accList'}
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/self-car/v1.0/tDisFileRecord/find/searchDistributorFileRecord', data, paging)
          }
          ref={this.tableRef}
        />
        <CCModalTable
          rowKey="guid"
          ref={this.modalRef}
          title={'失败原因'}
          footer={null}
          columns={columnsItem}
          tableFilter={(record) => ({ batchId: record.batchId })}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/self-car/v1.0/tImportCarData/find/searchImportDataErrList', data, paging)
          }
        />
        <OperationArea>
          <Upload {...uploadConfig}>
            <Button loading={this.state.loading} type="primary">
              上传明细
            </Button>
          </Upload>
        </OperationArea>
      </>
    );
  }
}
const columnsItem = [
  { title: '经销商名称', dataIndex: 'distributorName' },
  { title: '失败原因', dataIndex: 'errMsg' },
  { title: 'sheet', dataIndex: 'dataType' },
];
