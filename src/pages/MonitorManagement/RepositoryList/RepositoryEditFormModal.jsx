import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import Icon from '@/components/Icon';

class RepositoryEditFormModal extends Component {
  state = {
    modalShown: false,
    confirmLoading: false,
    record: {},
    initialValues: null,
  };
  formRef = React.createRef();
  show = (record) => {
    this.setState({
      modalShown: true,
      record,
      initialValues: record
        ? {
            whareHouseName: record.whareHouseName,
            newNumber: record.realCarNum,
            remark: record.remark,
          }
        : null,
    });
  };
  handleCancel = () => {
    this.setState({
      modalShown: false,
    });
  };
  handleModalOk = () => {
    this.formRef.current.submit();
  };
  onSubmit = async (value) => {
    console.log(value);
    const { record, confirmLoading } = this.state;
    if (!record.id) {
      message.error('数据异常，无id');
      return;
    }
    if (confirmLoading) {
      return;
    }
    this.setState({
      confirmLoading: true,
    });
    value.id = record.id;
    value.oldNumber = record.realCarNum;
    try {
      const { data } = await httpCommonClient.post('/WhareHouseAction_editWhareHouse', value);
      if (data.result === 0) {
        message.success('修改成功！');
        this.setState({
          modalShown: false,
          confirmLoading: false,
        });
        this.props.reload();
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      this.setState({
        confirmLoading: false,
      });
      message.error(error.message || error || '对不起，调用失败');
    }
  };

  render() {
    const { modalShown, confirmLoading, initialValues } = this.state;
    return (
      <Modal
        title="修改库存信息"
        visible={modalShown}
        onOk={this.handleModalOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={this.onSubmit}
          ref={this.formRef}
          initialValues={initialValues}
        >
          <Form.Item
            label={'二库名称'}
            name={'whareHouseName'}
            rules={[
              {
                required: true,
                message: '请填写二库名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={'库存车实际数量'}
            name={'newNumber'}
            rules={[
              {
                required: true,
                message: '请填写库存车实际数量',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={'说明'}
            name={'remark'}
            rules={[
              {
                required: true,
                message: '请填写说明',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div>
          <Icon type="info-circle" style={{ color: '#eb2f96' }} />
          <span
            style={{
              color: '#eb2f96',
              marginLeft: '6px',
            }}
          >
            修改库存车实际数量将自动解除相关预警信息
          </span>
        </div>
      </Modal>
    );
  }
}

export default RepositoryEditFormModal;
