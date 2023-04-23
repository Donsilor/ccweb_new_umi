import React, { Component } from 'react';
import { Divider, Form, Input, message, Modal, Tooltip } from 'antd';
import _ from 'lodash';

const FormItem = Form.Item;
const pointsAccountRules = [
  {
    required: true,
    message: '请输入分账号',
  },
  {
    pattern: /^\d{6}$/,
    message: '分账号应为6位数字',
  },
];

const commonRules = [
  {
    pattern: /^\d{14}$/,
    message: '该账号应为14位数字',
  },
];

class AccountInfoModalForm extends Component {
  state = {
    exportLoading: false,
    showAccountModal: false,
    modalLoading: false,
    record: {},
  };

  modalRef = React.createRef();
  formRef = React.createRef();

  show = (record) => {
    this.setState({
      record,
      modalLoading: false,
      showAccountModal: true,
    });
  };
  confirmAccount = (value) => {
    const { record } = this.state;
    if (!record || !value) return;
    this.setState({
      modalLoading: true,
    });
    const data = {
      bankId: record.bankId,
      fldSerailid: record.brandId,
      distributorId: record.distributorId,
      bondAccount: value.bondAccount,
      pointsAccount: value.pointsAccount,
      settlementAccount: value.settlementAccount,
      remittanceAccount: value.remittanceAccount,
    };
    httpFormClient
      .formSubmit('/BondAccountAction_saveBondAccountNum', 'bondQuery', data)
      .then(({ data }) => {
        if (data.result === 0) {
          message.success('账号信息更新成功！', 2.5);
          this.handleCancel();
          this.props.reload();
        } else {
          return Promise.reject(new Error(data.msg));
        }
      })
      .catch((err) => {
        return message.error(err.message || '账号信息更新失败，请重试！', 2.5);
      });
  };
  handleCancel = () => {
    this.setState({
      showAccountModal: false,
      modalLoading: false,
    });
  };
  handleSubmit = () => {
    this.formRef.current.validateFields().then((fieldsValue) => this.confirmAccount(fieldsValue));
  };
  renderForm = () => {
    const { record = {} } = this.state;
    if (_.isEmpty(record)) {
      return null;
    }
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <>
        <FormItem label="经销商名称" {...formItemLayout}>
          <span>{record.distributorName}</span>
        </FormItem>
        <FormItem label="品牌名称" {...formItemLayout}>
          <span>{record.brandName}</span>
        </FormItem>
        <FormItem
          label="保证金账号"
          {...formItemLayout}
          name={'bondAccount'}
          rules={[
            {
              required: true,
              message: '请输入保证金账号',
            },
            ...commonRules,
          ]}
        >
          <Input maxLength="14" />
        </FormItem>
        <FormItem
          label="分账号"
          {...formItemLayout}
          name={'pointsAccount'}
          rules={this.props.pointsAccountRequired ? pointsAccountRules : pointsAccountRules.slice(1)}
        >
          <Input maxLength="6" />
        </FormItem>
        <FormItem label="结算账号" {...formItemLayout} name={'settlementAccount'} rules={commonRules}>
          <Input maxLength="14" />
        </FormItem>
        <FormItem label="应解汇款账号" {...formItemLayout} name={'remittanceAccount'} rules={commonRules}>
          <Input maxLength="14" />
        </FormItem>
      </>
    );
  };

  render() {
    const { record = {} } = this.state;
    const { bondAccount, pointsAccount, settlementAccount, remittanceAccount } = record;
    const initialValues = { bondAccount, pointsAccount, settlementAccount, remittanceAccount };
    return (
      <Modal
        title="经销商保证金账号"
        visible={this.state.showAccountModal}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        confirmLoading={this.state.modalLoading}
        destroyOnClose
      >
        <Form initialValues={initialValues} ref={this.formRef}>
          {this.renderForm()}
        </Form>
      </Modal>
    );
  }
}

export default AccountInfoModalForm;
