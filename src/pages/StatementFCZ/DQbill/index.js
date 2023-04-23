import React, { Component } from 'react';
import { Button, Modal, Upload, message, Space } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCStoreTable from '@/components/CCStoreTable';
const { confirm } = Modal;
export default class uploadView extends Component {
  tableRef = React.createRef();
  state = {
    loading: false,
    list: [],
  };
  columns = [
    { title: '文件名', dataIndex: 'fileName' },
    { title: '上传时间', dataIndex: 'uploadTime' },
    { title: '处理状态', dataIndex: 'ledgerStatus' },
    { title: '台账生成时间', dataIndex: 'generateTime' },
    { title: '累计下载次数', dataIndex: 'downloadTimes' },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          {record.ledgerStatus == '待生成台账' && (
            <Space>
              <a
                onClick={() => {
                  this.setState({ loading: true });
                  httpCommonClient
                    .post(`/warning/v1.0/fangche/fangcheLedger/generate/RemindMaturedNote`, {
                      importRecordId: record.importRecordId,
                    })
                    .then(({ data = {} }) => {
                      if (data.code === 200) {
                        message.success(data.message);
                        this.handleSearch();
                      } else {
                        message.error(data.message);
                        this.setState({ loading: false });
                      }
                    });
                }}
              >
                生成台账
              </a>
              <a onClick={this.deleOper(record)}>删除</a>
            </Space>
          )}
          {record.ledgerStatus == '台账已生成' && (
            <a
              onClick={() => {
                httpCommonClient
                  .post(`/warning/v1.0/fangche/fangcheLedger/update/downloadTimes`, { id: record.fangcheLedgerId })
                  .then(({ data = {} }) => {
                    if (data.code === 200) {
                      message.success(data.message);
                      this.handleSearch();
                    } else {
                      message.error(data.message);
                    }
                  });
              }}
              href={`/warning${record.fileUrl}`}
            >
              下载
            </a>
          )}
        </Space>
      ),
    },
  ];
  //删除
  deleOper = (record) => () => {
    let self = this;
    confirm({
      title: '请确认是否删除该文件?',
      onOk() {
        httpCommonClient
          .post(`/warning/v1.0/warning/importRecord/delete`, { id: record.importRecordId })
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success(data.message);
              self.handleSearch();
            } else {
              message.error(data.message);
            }
          });
      },
    });
  };
  handleSearch = () => {
    this.tableRef.current.reload();
  };
  componentDidMount() {
    this.handleSearch();
  }
  render() {
    let that = this;
    let uploadConfig = {
      name: 'file',
      action: '/warning/v1.0/warning/importRecord/upload',
      data: { sourceType: 'source_type_100' },
      accept: '.xls,.xlsx',
      beforeUpload(file) {
        that.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              that.setState({ loading: false });
              message.success('上传成功');
              that.handleSearch();
            } else {
              that.setState({ loading: false });
              message.error(info.file.response.message);
            }
          }
        } else if (info.file.status === 'error') {
          that.setState({ loading: false });
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    return (
      <>
        <CCStoreTable
          ref={this.tableRef}
          tableKey={'/daoqiFCZ'}
          rowKey="importRecordId"
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/fangcheLedger/list/RemindMaturedNote', data, paging)
          }
        />
        <OperationArea>
          <Upload {...uploadConfig}>
            <Button loading={this.state.loading} type="primary">
              请选择一个excel文件
            </Button>
          </Upload>
        </OperationArea>
      </>
    );
  }
}
