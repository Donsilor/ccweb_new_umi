import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, message, InputNumber, Modal, Space } from 'antd';
import Icon from '@/components/Icon';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import _ from 'lodash';

class AmountModalForm extends Component {
  state = {
    record: {},
    showModal: false,
    modalLoading: false,
    isformInItems: false,
    infoMes: false,
    balance: '',
  };
  formRef = React.createRef();
  show = (record) => {
    this.setState({
      record,
      showModal: true,
    });
  };
  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };
  handleAmountModalOk = () => {
    this.formRef.current.submit();
  };
  onFinish = (values) => {
    const { record } = this.state;
    if (!record.id) {
      message.info('数据id异常，请联系后台');
      return;
    }
    let params = { exportDataId: record.id };
    if (record.exportType === 5) {
      let outJsonList = [],
        oddAmoutTotal = 0,
        depositTotal = new BigNumber(Math.abs(record.depositTotal)).multipliedBy(10000).toFormat().replace(/,/g, '');
      try {
        const amountOutValueList = values.amountOut;
        amountOutValueList.forEach((item) => {
          outJsonList.push({
            oddNum: item.oddNum,
            oddAmout: item.oddAmout,
            interestEndDate: formatDate(item.interestEndDate),
          });
          oddAmoutTotal += item.oddAmout;
        });
      } catch (e) {}
      if (oddAmoutTotal < parseFloat(depositTotal)) {
        message.info('单号金额不足以抵扣转出金额，请添加单号！');
        return;
      }
      params.outJsonList = JSON.stringify(outJsonList);
      if (oddAmoutTotal < parseFloat(depositTotal)) {
        message.info('单号金额不足以抵扣转出金额，请添加单号！');
        return;
      }
      if (this.state.isformInItems) {
        params.inJsonList = JSON.stringify([
          {
            oddNum: values.oddNum,
            oddAmout: values.oddAmout,
            interestStartDate: formatDate(values.interestStartDate),
          },
        ]);
      }
      this.setState({
        modalLoading: true,
      });
      httpFormClient.formSubmit('/BondPrintAction_transferOutDeposit', '', params).then(({ data = {} }) => {
        if (data.result === 0) {
          message.success(data.msg);
          this.setState({
            showModal: false,
            modalLoading: false,
          });
          this.props.reload();
        } else {
          this.setState({
            modalLoading: false,
          });
          message.error(data.msg);
        }
      });
    } else {
      params = {
        exportDataId: record.id,
        oddType: record.exportType < 3 ? 1 : 2,
        oddNum: values.oddNum,
        interestStartDate: formatDate(values.interestStartDate),
      };
      httpFormClient.formSubmit('/BondPrintAction_transferInDeposit', '', params).then(({ data = {} }) => {
        if (data.result === 0) {
          message.success(data.msg);
          this.setState({
            showModal: false,
            modalLoading: false,
          });
          this.props.reload();
        } else {
          this.setState({
            modalLoading: false,
          });
          message.error(data.msg);
        }
      });
    }
  };
  onOddNumChange = (e, fieldIndex) => {
    if (e.target.value.length !== 6) {
      return;
    }
    const self = this;
    httpFormClient
      .formSubmit('/BondPrintAction_getOddAmout', '', { id: this.state.record.id, oddNum: e.target.value })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          self.formRef.current.setFields([{ name: ['amountOut', fieldIndex, 'balance'], value: data.oddAmout }]);
        } else {
          self.formRef.current.setFields([{ name: ['amountOut', fieldIndex, 'balance'], value: 20 }]);
          message.error(data.msg);
        }
      });
  };
  renderOutForm = () => {
    const { record, isformInItems } = this.state;
    const initialValues = { amountOut: [{ name: ['amountOut'], value: [undefined] }] };
    return (
      <Form onFinish={this.onFinish} ref={this.formRef} layout={'vertical'} size={'small'} initialValues={initialValues}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
          转出
          <span style={{ fontSize: '14px' }}>
            (共需转出：{new BigNumber(Math.abs(record.depositTotal)).multipliedBy(10000).toFormat()}元)
          </span>
        </h3>
        {record.exportType === 5 && (
          <Form.List name={'amountOut'}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={index} style={{ display: 'flex', position: 'relative' }} align="baseline">
                    <Form.Item
                      {...field}
                      label={index === 0 ? '维护单号' : ''}
                      name={[field.name, 'oddNum']}
                      rules={[
                        {
                          required: true,
                          message: '请输入单号',
                        },
                        {
                          pattern: /^\d{6}$/,
                          message: '单号应为6位数字',
                        },
                      ]}
                    >
                      <Input
                        placeholder="请输入单号"
                        style={{ width: '100%' }}
                        maxLength={6}
                        onChange={(e) => this.onOddNumChange(e, index)}
                      />
                    </Form.Item>
                    <Form.Item {...field} label={index === 0 ? '单号余额(元)' : ''} name={[field.name, 'balance']}>
                      <Input disabled style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label={index === 0 ? '转出金额(元)' : ''}
                      name={[field.name, 'oddAmout']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const balance = getFieldValue(['amountOut', index, 'balance']);
                            if (!value) {
                              return Promise.reject('请输入转出金额');
                            }
                            if (value < 0) {
                              return Promise.reject('金额不能为负数');
                            }
                            // if (balance < value) {
                            //   return Promise.reject('转出金额不能大于单号余额');
                            // }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <InputNumber placeholder="请输入转出金额" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label={index === 0 ? '计息截止日期' : ''}
                      style={{ width: 200 }}
                      name={[field.name, 'interestEndDate']}
                      initialValue={moment(record.exportTime.time)}
                      rules={[
                        {
                          required: true,
                          message: '请输入计息截止日期',
                        },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) => current && current.format('YYYY') < moment().add(-1, 'y').format('YYYY')}
                        placeholder="请输入截止日期"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    {index > 0 && (
                      <div style={styles.deleteFieldBtn}>
                        <Icon type="minus-circle-o" onClick={() => remove(index)} />
                      </div>
                    )}
                  </Space>
                ))}
                <Space key={'total'} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Button style={{ marginRight: '10px' }} type="dashed" onClick={() => add()}>
                    <Icon type="plus" /> 添加单号
                  </Button>
                  {!isformInItems ? (
                    <Button style={{ marginRight: '10px' }} type="dashed" onClick={() => this.setState({ isformInItems: true })}>
                      <Icon type="plus" /> 添加转入
                    </Button>
                  ) : (
                    <Button style={{ marginRight: '10px' }} type="dashed" onClick={() => this.setState({ isformInItems: false })}>
                      <Icon type="minus" /> 移除转入
                    </Button>
                  )}
                </Space>
              </>
            )}
          </Form.List>
        )}
        {isformInItems && (
          <div>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>转入</h3>
            <span style={{ color: 'red' }}>注意：转出单号为定期，且剩余金额>=10000元的，无需在此维护！</span>
            <Form.Item
              label={'维护单号'}
              name={'oddNum'}
              rules={[
                {
                  required: true,
                  message: '请输入单号',
                },
              ]}
            >
              <Input placeholder="请输入单号" style={{ width: '400px' }} />
            </Form.Item>
            <Form.Item
              label={'转入金额(元)'}
              name={'oddAmout'}
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('请输入转入金额');
                    }
                    if (value < 0) {
                      return Promise.reject('金额不能为负数');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber placeholder="请输入转入金额" style={{ width: '400px' }} />
            </Form.Item>
            <Form.Item
              label="计息开始日期"
              name={'interestStartDate'}
              initialValue={moment(record.exportTime.time)}
              rules={[
                {
                  required: true,
                  message: '请输入开始计息日期',
                },
              ]}
            >
              <DatePicker placeholder="请输入开始计息日期" style={{ width: '400px' }} />
            </Form.Item>
          </div>
        )}
      </Form>
    );
  };
  renderInForm = () => {
    const { record } = this.state;
    return (
      <Form onFinish={this.onFinish} ref={this.formRef} size={'small'} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="单号类型">
          <Input disabled={true} placeholder={record.exportType < 3 ? '定期' : '活期'} />
        </Form.Item>
        <Form.Item label="保证金金额(元)">
          <Input disabled={true} placeholder={record.depositTotalLable} />
        </Form.Item>
        <Form.Item
          label="维护单号"
          name={'oddNum'}
          rules={[
            {
              required: true,
              message: '请输入单号',
            },
            {
              pattern: /^\d{6}$/,
              message: '单号应为6位数字',
            },
          ]}
        >
          <Input placeholder="请输入单号" />
        </Form.Item>
        <Form.Item
          label="计息开始日期"
          name={'interestStartDate'}
          initialValue={record.exportTime && moment(record.exportTime.time)}
          rules={[
            {
              required: true,
              message: '请输入开始计息日期',
            },
          ]}
        >
          <DatePicker placeholder="请输入开始计息日期" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    );
  };

  render() {
    const { record, modalLoading } = this.state;
    return (
      <Modal
        title={record.exportType == 5 ? '维护单号' : translate(record.exportType, EBDic.exportTypeDicList)}
        width={record.exportType == 5 ? 800 : 500}
        visible={this.state.showModal}
        onOk={this.handleAmountModalOk}
        onCancel={this.handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" loading={modalLoading} type="primary" onClick={this.handleAmountModalOk}>
            确认回执
          </Button>,
        ]}
      >
        {record.exportType === 5 ? this.renderOutForm() : this.renderInForm()}
      </Modal>
    );
  }
}

export default AmountModalForm;

const styles = {
  deleteFieldBtn: {
    position: 'absolute',
    top: 0,
    right: '-6px',
  },
};
