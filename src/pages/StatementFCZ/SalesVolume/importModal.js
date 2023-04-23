import React, { Component } from 'react';
import { Button, Space } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCFormModal from '@/components/CCFormModal';
import { exportFile } from '@/utils';
import moment from 'moment';

export default class View extends Component {
  modalRef = React.createRef();
  state = {
    title: '',
  };
  render() {
    const { title } = this.state;
    return (
      <>
        <OperationArea>
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                this.setState({ title: '生成回款数据' });
                this.modalRef.current.show();
              }}
            >
              生成回款数据
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ title: '导出' });
                this.modalRef.current.show();
              }}
            >
              导出报表
            </Button>
          </Space>
        </OperationArea>
        <CCFormModal
          title={title}
          ref={this.modalRef}
          onFun={(formData) => {
            if (title == '导出') {
              httpBufferClient
                .post(`/warning/v1.0/warning/brandReturnState/export/state`, {
                  paramYearMonth: moment(formData.paramYearMonth).format('YYYY/MM'),
                  ...(this.props.path.includes('DR') && { dataSourceType: '导入' }),
                })
                .then((payload) => {
                  exportFile(payload);
                })
                .then(() => {
                  this.modalRef.current.hide();
                })
                .catch((err) => {
                  message.error('系统异常！');
                });
            } else {
              httpCommonClient
                .post('/warning/v1.0/warning/brandReturnState/generate/state', {
                  paramYearMonth: moment(formData.paramYearMonth).format('YYYY/MM'),
                  ...(this.props.path.includes('DR') && { dataSourceType: '导入' }),
                })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    message.success(data.message);
                    this.modalRef.current.hide();
                    this.props.onSearch();
                  } else {
                    message.error(data.message);
                  }
                });
            }
          }}
          configList={[
            {
              format: 'YYYY-MM',
              picker: 'month',
              label: '年月',
              type: 'datePicker',
              key: 'paramYearMonth',
              required: true,
            },
          ]}
        />
      </>
    );
  }
}
