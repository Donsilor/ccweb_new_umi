import React, { PureComponent } from 'react';
import { Form, Row, Col, Modal, Select, Input, DatePicker, Radio, message, Cascader, InputNumber, Tooltip } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;

export default class CCFormModal extends PureComponent {
  formRef = React.createRef();
  state = {
    loading: false,
    showModal: false,
  };
  handleOk = () => {
    this.formRef.current.handleSubmit();
  };
  show = () => {
    this.setState({ showModal: true });
  };
  hide = () => {
    this.setState({ showModal: false, loading: false });
  };
  hideLoading = () => {
    this.setState({ loading: false });
  };
  setValue = (values) => {
    this.formRef.current.setValue(values);
  };
  onSubmit = (formData) => {
    this.setState({
      loading: true,
    });
    this.props.onSubmit
      ? this.props
          .onSubmit(formData)
          .then(({ data = {} }) => {
            if (data && (data.result === 0 || data.code === 200)) {
              message.success('操作成功');
              this.setState({ loading: false });
              this.hide();
              typeof this.props.onFinal === 'function' && this.props.onFinal();
            } else {
              return Promise.reject(data.msg || '操作失败，请重试');
            }
          })
          .catch((err) => {
            message.error(err.message || err);
            this.setState({ loading: false });
          })
      : this.props.onFun(formData);
  };
  render() {
    const { title = '查看', configList = [], record, col = 1 } = this.props;
    return (
      <Modal
        width={col === 2 ? 1100 : undefined}
        title={title}
        onOk={this.handleOk}
        onCancel={this.hide}
        visible={this.state.showModal}
        confirmLoading={this.state.loading}
        destroyOnClose
        {...this.props}
      >
        <ConfigForm configList={configList} ref={this.formRef} onSubmit={this.onSubmit} record={record} col={col} />
      </Modal>
    );
  }
}

export class ConfigForm extends PureComponent {
  formRef = React.createRef();
  handleSubmit = () => {
    this.formRef.current.submit();
  };
  setValue = (values) => {
    this.formRef.current.setFieldsValue(values);
  };
  renderRule = (config) => {
    let actionName = '输入';
    if (config.type === 'textArea') {
      return (
        config.rules ||
        (config.required
          ? [
              { required: true, message: `请输入${config.label}` },
              { max: 200, message: '最多输入200个字符' },
            ]
          : [{ max: 200, message: '最多输入200个字符' }])
      );
    } else if (config.type === 'radio' || config.type === 'select' || config.type === 'datePicker' || config.type === 'custom') {
      actionName = '选择';
    }
    if (Array.isArray(config.rules)) {
      config.rules.forEach((rule) => {
        if (rule.validator) {
          rule.validator = rule.validator.bind(this);
        }
      });
      return config.rules;
    } else {
      return config.required ? [{ required: true, message: `请${actionName}${config.label}` }] : [];
    }
  };
  renderFormItem = (config, index) => {
    const { record } = this.props;
    switch (config.type) {
      case 'label':
        return <span>{config.key ? record[config.key] : config.value}</span>;
      case 'input':
        return <Input type={config.inType || ''} placeholder={config.placeholder || `请输入${config.label}`} {...config} />;
      case 'inputNumber':
        return <InputNumber style={{ width: '100%' }} {...config} />;
      case 'textArea':
        return <TextArea placeholder={`请输入${config.label}`} rows={3} {...config} />;
      case 'datePicker':
        return (
          <DatePicker
            placeholder={`请选择${config.label}`}
            style={{ width: '100%' }}
            format={config.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
            {...config}
          />
        );
      case 'rangePicker':
        return <RangePicker format="YYYY/MM/DD" {...config} />;
      case 'radio':
        return (
          <Radio.Group disabled={config.disabled} {...config}>
            {Array.isArray(config.optionList) &&
              config.optionList.map((option, i) => (
                <Radio style={config.style} value={option.code} key={i}>
                  {option.label || option.name}
                </Radio>
              ))}
          </Radio.Group>
        );
      case 'select':
        return (
          <Select
            placeholder={`请选择${config.label}`}
            showSearch={config.showSearch}
            disabled={config.disabled}
            filterOption={(input, option) => option.children.includes(input)}
            onChange={config.onChange}
          >
            {Array.isArray(config.optionList) &&
              config.optionList.map((option, i) => (
                <Select.Option value={option.code} key={i} item={option}>
                  {option.name}
                </Select.Option>
              ))}
          </Select>
        );
      case 'cascader':
        return (
          <Cascader
            showSearch={config.showSearch}
            onChange={config.onChange}
            options={config.options}
            fieldNames={config.fieldNames}
            placeholder={`请选择${config.label}`}
          />
        );
      default:
        return null;
    }
  };
  renderForm = () => {
    const { configList, col } = this.props;
    return configList.map(
      (config, index) =>
        config && (
          <Col span={24 / col} key={index}>
            <FormItem label={config.label} name={config.key} rules={this.renderRule(config)}>
              {this.renderFormItem(config, index)}
            </FormItem>
          </Col>
        ),
    );
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { configList } = this.props;
    const initialValues = {};
    configList.forEach((config) => {
      initialValues[config.key] = config.initialvalue;
    });
    return (
      <Form onFinish={this.props.onSubmit} ref={this.formRef} initialValues={initialValues} {...formItemLayout} size={'small'}>
        <Row gutter={24}>{this.renderForm()}</Row>
      </Form>
    );
  }
}
