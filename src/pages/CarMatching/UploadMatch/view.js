import React, { Component } from 'react';
import { connect } from 'umi';
import { Spin, Upload, Button, Space, Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import { exportFile } from '@/utils';
import DetailModal from './detail';
const { confirm } = Modal;
class View extends Component {
  tableRef = React.createRef();
  state = {
    loading: false,
    showModal: false,
    record: {},
  };
  columns = [
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    { title: '上传文件名', dataIndex: 'name' },
    {
      title: '处理状态',
      dataIndex: 'importStatusCode',
      render: (text) => {
        return text == 'import_status_1' ? `待导入` : `导入完成`;
      },
    },
    {
      title: '推送状态',
      dataIndex: 'syncFlag',
      render: (text) => (text ? `已推送` : `未推送`),
    },
    { title: '导入时间', dataIndex: 'importTime' },
    { title: '推送时间', dataIndex: 'syncTime' },
    {
      title: '操作',
      render: (text, record) => (
        <>
          {record.importStatusCode == 'import_status_1' && (
            <Space>
              <a onClick={this.importOper(record)}>导入</a>
              <a onClick={this.deleOper(record)}>删除</a>
            </Space>
          )}
          {record.importStatusCode == 'import_status_2' && (
            <Space>
              {!record.syncFlag && (
                <a
                  onClick={() => {
                    let self = this;
                    confirm({
                      title: '请确认是否推送橙E?',
                      onOk() {
                        return new Promise((resolve, reject) => {
                          httpCommonClient
                            .post('/warning/v1.0/matching/matchingCarBill/syncCars', { importRecordId: record.id })
                            .then(({ data = {} }) => {
                              if (data.code === 200) {
                                message.success(data.message);
                              } else {
                                message.error(data.message);
                              }
                              self.tableRef.current.reload();
                              resolve();
                            })
                            .catch(() => {
                              reject();
                              message.error('系统异常');
                            });
                        });
                      },
                    });
                  }}
                >
                  推送橙E
                </a>
              )}
              <a
                onClick={() => {
                  this.props.dispatch({
                    type: 'form/updateQuery',
                    payload: {
                      formKey: 'pushMatchUpload/detail',
                      value: {},
                    },
                  });
                  this.setState({ record, showModal: true });
                }}
              >
                查看
              </a>
            </Space>
          )}
        </>
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
        httpCommonClient.post(`/warning/v1.0/warning/importRecord/import`, { id: record.id }).then(({ data = {} }) => {
          if (data.code === 200) {
            self.setState({ loading: false });
            self.tableRef.current.reload();
            if (self.props.sourceType == 'source_type_10') {
              Modal.success({
                title: '提示信息：',
                content: data.message,
              });
            } else {
              message.success(data.message);
            }
          } else {
            self.setState({ loading: false });
            Modal.error({
              title: '提示信息：',
              content: data.message,
            });
          }
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
        httpCommonClient.post(`/warning/v1.0/warning/importRecord/delete`, { id: record.id }).then((respone) => {
          if (respone.data.code === 200) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          self.tableRef.current.reload();
        });
      },
    });
  };
  componentDidMount() {
    this.tableRef.current.reload();
  }
  render() {
    let that = this;
    let uploadConfig = {
      showUploadList: false,
      name: 'file',
      action: '/warning/v1.0/warning/importRecord/upload',
      data: { sourceType: 'source_type_10' },
      accept: '.xls,.xlsx',
      beforeUpload() {
        that.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              message.success('上传成功');
              that.tableRef.current.reload();
            } else {
              message.error(info.file.response.message);
            }
            that.setState({ loading: false });
          }
        } else if (info.file.status === 'error') {
          that.setState({ loading: false });
          message.error(`系统异常！`);
        }
      },
    };
    return (
      <Spin spinning={this.state.loading}>
        <div className="ccTableArea">
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                this.setState({ loading: true });
                httpBufferClient
                  .submit('/warning/v1.0/matching/matchingCarBill/export/templates', {})
                  .then((payload) => {
                    exportFile(payload);
                  })
                  .then((res) => {
                    this.setState({ loading: false });
                  })
                  .catch((err) => {
                    message.error('系统异常');
                    this.setState({ loading: false });
                  });
              }}
            >
              下载模板
            </Button>
            <Upload {...uploadConfig}>
              <Button type="primary">请选择一个excel文件</Button>
            </Upload>
          </Space>
        </div>
        <CCStoreTable
          columns={this.columns}
          tableKey={'pushMatchUpload'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/warning/importRecord/list',
              { sourceTypeCode: 'source_type_10' },
              paging,
            )
          }
          ref={this.tableRef}
        />
        {this.state.showModal && (
          <Modal title={'查看'} visible onCancel={() => this.setState({ showModal: false })} footer={null} width="95%">
            <DetailModal record={this.state.record} />
          </Modal>
        )}
      </Spin>
    );
  }
}
export default connect()(View);
