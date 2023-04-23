import React, { Component } from 'react';
import { Button, Modal, Upload, Spin, Space } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import DetaiModal from './detaiModal';
const { confirm } = Modal;
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    showModal: false,
    loading: false,
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => this.tableRef.current.reload();
  columns = [
    { title: '批次号', dataIndex: 'batchno' },
    { title: '上传文件名', dataIndex: 'uploadFileName' },
    { title: '上传人', dataIndex: 'uploadUserName' },
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    {
      title: '处理状态',
      dataIndex: 'status',
      render: (text) => {
        if (text == '1') {
          return '上传成功，待导入';
        } else if (text == '2') {
          return '导入成功';
        } else {
          return '导入失败';
        }
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          {record.status == '1' && (
            <Space>
              <a onClick={this.importOper(record)}>导入</a>
              <a onClick={this.deleOper(record)}>删除</a>
            </Space>
          )}
          {record.status == '2' && (
            <a
              onClick={() => {
                this.setState({ showModal: true, record: { batchno: record.batchno } });
              }}
            >
              查看
            </a>
          )}
        </Space>
      ),
    },
  ];
  //导入
  importOper = (record) => () => {
    let self = this;
    confirm({
      title: '请确认是否导入该文件?',
      onOk() {
        self.setState({ loading: true });
        httpCommonClient
          .post(`/CarDataUploadAction_importData`, { uploadFileId: record.uploadFileId })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              self.handleSearch();
              message.success(data.msg);
            } else {
              Modal.error({
                title: '提示信息：',
                content: data.msg,
              });
            }
            self.setState({ loading: false });
          })
          .catch(() => {
            self.setState({ loading: false });
            message.error('系统异常');
          });
      },
    });
  };
  //删除
  deleOper = (record) => () => {
    let self = this;
    confirm({
      title: '请确认是否删除该文件?',
      onOk() {
        httpCommonClient.post(`/CarDataUploadAction_del`, { uploadFileId: record.uploadFileId }).then(({ data = {} }) => {
          if (data.result === 0) {
            message.success(data.msg);
          } else {
            message.error(data.msg);
          }
          self.handleSearch();
        });
      },
    });
  };
  render() {
    let self = this;
    let uploadConfig = {
      name: 'file',
      showUploadList: false,
      action: '/api/CarDataUploadAction_uploadFile',
      data: { fileType: '53' },
      accept: '.xls',
      beforeUpload(file) {
        self.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.result === 0) {
              message.success('上传成功');
              self.handleSearch();
            } else {
              message.error(info.file.response.msg);
            }
            self.setState({ loading: false });
          }
        } else if (info.file.status === 'error') {
          self.setState({ loading: false });
          message.error(`系统异常`);
        }
      },
    };
    return (
      <Spin spinning={this.state.loading}>
        <Space className="ccTableArea">
          <Button
            type="primary"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否本周无明细?',
                onOk() {
                  self.setState({ loading: true });
                  httpCommonClient.post(`/CarDataUploadAction_addNull`, { fileType: '53' }).then(({ data = {} }) => {
                    if (data.result === 0) {
                      message.success(data.msg);
                      self.handleSearch();
                    } else {
                      message.error(data.msg);
                    }
                    self.setState({ loading: false });
                  });
                },
              });
            }}
          >
            本周无明细
          </Button>
          <Button
            type="primary"
            onClick={() => {
              let a = document.createElement('a');
              a.href = `/resource/template/经销商车辆明细对账模板.xls`;
              a.click();
            }}
          >
            下载模板
          </Button>
          <Upload {...uploadConfig}>
            <Button type="primary">导入明细</Button>
          </Upload>
        </Space>
        <CCStoreTable
          rowKey={'batchno'}
          tableKey={'/CarAction_Dis/carTodo'}
          columns={this.columns}
          fetchFunc={(data, paging) => httpCommonClient.submit('/CarDataUploadAction_list', { fileType: '53', ...paging })}
          ref={this.tableRef}
        />
        {this.state.showModal && <DetaiModal record={this.state.record} onCancel={() => this.setState({ showModal: false })} />}
      </Spin>
    );
  }
}
