import React, { Component } from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;
let AllDealerList = null;

class EditDealerModal extends Component {
  state = {
    selectLoading: false,
    dealerList: [],
    record: {},
    initialValues: {},
    modalShown: false,
    confirmLoading: false,
  };
  formRef = React.createRef();
  getAllDealerList = async () => {
    this.setState({
      selectLoading: true,
    });
    const { data } = await httpCommonClient.post('/SuperviseAction_allSpecialDealer', {});
    if (data && data.result === 0 && Array.isArray(data.list)) {
      this.setState({
        dealerList: data.list,
        selectLoading: false,
      });
      AllDealerList = data.list.slice();
    } else {
      message.error(data.msg || '获取所有经销商失败');
      this.setState({
        selectLoading: false,
      });
    }
  };
  show = (item) => {
    if (item) {
      const initialValues = {
        dealer: item.dealer,
        startTime: moment(item.startTime),
        endTime: moment(item.endTime),
      };
      this.setState({
        record: item,
        initialValues,
        modalShown: true,
      });
    } else {
      this.setState({
        modalShown: true,
      });
    }

    // this.formRef.current?.setFieldsValue(initialValues)
  };
  handleModalOk = () => {
    console.log('handleModalOk');
    this.formRef.current?.submit();
  };
  handleCancel = () => {
    this.setState({
      modalShown: false,
      confirmLoading: false,
    });
  };
  onFinish = async (formValue) => {
    console.log('onFinish', formValue);
    if (!moment(formValue.startTime).isBefore(moment(formValue.endTime))) {
      message.info('失效时间应晚于生效时间');
      return;
    }
    const { record } = this.state;
    this.setState({
      confirmLoading: true,
    });
    const params = {
      dealer: formValue.dealer,
      startTime: formatDate(moment(formValue.startTime)),
      endTime: formatDate(moment(formValue.endTime)),
    };
    if (record.id) {
      params.id = record.id;
    }
    const { data } = await httpCommonClient.post('/SuperviseAction_updateSpecialDealer', params);
    if (data.result === 0) {
      message.success('操作成功！', 2.5);
      this.setState({
        confirmLoading: false,
        modalShown: false,
      });
      this.props.reload();
    } else {
      message.error(data.msg || '操作失败，请稍后重试');
      this.setState({
        confirmLoading: false,
      });
    }
  };

  componentDidMount() {
    if (!Array.isArray(AllDealerList)) {
      this.getAllDealerList();
    } else {
      this.setState({
        dealerList: AllDealerList.slice(),
      });
    }
  }

  render() {
    const { modalShown, confirmLoading, dealerList, selectLoading, initialValues, record } = this.state;
    return (
      <Modal
        title={record.id ? '查看修改' : '新增特殊经销商'}
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
          onFinish={this.onFinish}
          ref={this.formRef}
          initialValues={initialValues}
        >
          <Form.Item
            label={'经销商名称'}
            name={'dealer'}
            rules={[
              {
                required: true,
                message: '请选择一个经销商',
              },
            ]}
          >
            <Select showSearch placeholder="选择一个经销商" loading={selectLoading} disabled={initialValues.dealer}>
              {dealerList.map((item) => (
                <Option value={item} key={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={'生效日期'}
            name={'startTime'}
            rules={[
              {
                required: true,
                message: '请选择生效日期',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={'失效日期'}
            name={'endTime'}
            rules={[
              {
                required: true,
                message: '请选择失效日期',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditDealerModal;
