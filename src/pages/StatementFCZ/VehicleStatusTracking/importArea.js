import React, { Component } from 'react';
import { Space, Button, Upload, Modal, message } from 'antd';
import CCTable from '@/components/CCTable';
import CCFormModal from '@/components/CCFormModal';
import OperationArea from '@/layouts/OperationArea';
import { importColumns } from '../Columns';
import { optionsArr } from '@/utils/dict';
import { exportFile } from '@/utils';
import _ from 'lodash';
const { confirm } = Modal;
export default class View extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    loading: false,
    importRecordId: '', //'1758',
    record: {},
    tradername: [],
  };
  componentDidMount() {
    this.tableRef.current.reload();
  }
  render() {
    const { record, importRecordId, tradername } = this.state;
    let that = this;
    let uploadConfig = {
      name: 'file',
      showUploadList: false,
      action: '/warning/v1.0/fangche/vehicleStatusTracking/upload',
      accept: '.xls,.xlsx',
      beforeUpload(file) {
        that.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              message.success('上传成功');
              that.setState({ importRecordId: info.file.response.data.id }, () => that.tableRef.current.reload());
            } else {
              message.error(info.file.response.message);
            }
            that.setState({ loading: false });
          }
        } else if (info.file.status === 'error') {
          that.setState({ loading: false });
          message.error(`系统异常`);
        }
      },
    };
    return (
      <>
        <CCTable
          columns={[
            ...importColumns,
            {
              title: '操作',
              fixed: 'right',
              render: (text, record) => (
                <Space>
                  <a
                    onClick={() => {
                      httpCommonClient.post(`/warning/v1.0/warning/supplyChain/list/selected `, {}).then(({ data = {} }) => {
                        if (data.code === 200) {
                          this.setState({ record, tradername: data.data });
                          this.modalRef.current.show();
                        }
                      });
                    }}
                  >
                    修改
                  </a>
                  <a
                    onClick={() => {
                      let self = this;
                      confirm({
                        title: '请确认是否删除数据？',
                        onOk() {
                          httpCommonClient
                            .post(`/warning/v1.0/fangche/vehicleStatusTracking/delete`, { id: record.id })
                            .then(({ data = {} }) => {
                              if (data.code === 200) {
                                self.tableRef.current.reload();
                              } else {
                                message.error(data.message);
                              }
                            });
                        },
                      });
                    }}
                  >
                    删除{' '}
                  </a>
                </Space>
              ),
            },
          ]}
          rowClassName={(record) =>
            !record.syncCarId || record.pledgeStatus == '已释放' || record.departStatus == '已退货' ? 'tablePriColor' : ''
          }
          tableKey={'/vehicleTracking/import'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/fangche/vehicleStatusTracking/list/import',
              { ...data, importRecordId },
              paging,
            )
          }
          ref={this.tableRef}
        />
        <CCFormModal
          title={'修改'}
          ref={this.modalRef}
          onFinal={() => this.tableRef.current.reload('current')}
          onSubmit={(formData) => {
            const params = formData;
            params.id = record.id;
            params.remarkSituationCode = formData.remarkReason[0];
            params.remarkReasonCode = formData.remarkReason[1];
            delete params.remarkReason;
            return httpCommonClient.post('/warning/v1.0/fangche/vehicleStatusTracking/update/import', params);
          }}
          configList={[
            {
              label: '经销商',
              type: 'input',
              key: 'custname',
              initialvalue: record.custname,
              disabled: true,
            },
            {
              label: '标识',
              type: 'input',
              key: 'identification',
              initialvalue: record.identification,
              disabled: true,
            },
            {
              label: '单价',
              type: 'inputNumber',
              key: 'unitprice',
              initialvalue: record.unitprice,
              disabled: record.syncCarId,
            },
            {
              label: '供应链',
              type: 'select',
              key: 'tradername',
              optionList: tradername,
              initialvalue: record.tradername,
              disabled: record.syncCarId,
            },
            {
              label: '备注情况/原因',
              type: 'cascader',
              key: 'remarkReason',
              required: true,
              options: optionsArr(),
              fieldNames: { label: 'name', value: 'code' },
              initialvalue: _.isEmpty(record.remarkSituationCode) ? [] : [record.remarkSituationCode, record.remarkReasonCode],
            },
            {
              label: '备注内容',
              type: 'input',
              key: 'remarkContent',
              initialvalue: record.remarkContent,
            },
          ]}
        />
        <OperationArea>
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                httpBufferClient
                  .submit('/warning/v1.0/fangche/vehicleStatusTracking/export/templates', {})
                  .then((payload) => {
                    exportFile(payload);
                  })
                  .catch((err) => {
                    message.error('系统异常');
                  });
              }}
            >
              下载模板
            </Button>
            <Upload {...uploadConfig}>
              <Button loading={this.state.loading} type="primary">
                请选择一个excel文件
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => {
                let self = this;
                if (!importRecordId) {
                  Modal.info({
                    title: '提示信息：',
                    content: '没有可导入的数据 !',
                  });
                } else {
                  confirm({
                    title: (
                      <div>
                        请确认是否导入数据？<div>(*已退货和已释放数据不导入系统)</div>
                      </div>
                    ),
                    onOk() {
                      httpCommonClient
                        .post(`/warning/v1.0/fangche/vehicleStatusTracking/import/tracking`, { importRecordId })
                        .then(({ data = {} }) => {
                          if (data.code === 200) {
                            self.props.history.push('/vehicleTracking/all');
                          } else {
                            message.error(data.message);
                          }
                        });
                    },
                  });
                }
              }}
            >
              确认导入
            </Button>
            <Button onClick={() => this.props.history.push('/vehicleTracking/all')}>返回</Button>
          </Space>
        </OperationArea>
      </>
    );
  }
}
