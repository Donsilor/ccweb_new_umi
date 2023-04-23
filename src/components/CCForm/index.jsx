import React, { PureComponent } from 'react';
import { Button, Col, Form, Row, Input } from 'antd';
import { connect } from 'umi';
import './style.module.less';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import { FormArea } from '@/layouts/ViewWrapper';
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
class CCForm extends PureComponent {
  formRef = React.createRef();

  componentDidMount() {
    if (_isEmpty(this.props.query)) {
      const query = this.renderDefaultValues();
      this.updateQuery(query);
      this.forceUpdate(() => {
        this.props.onSearch(query);
      });
    } else {
      this.formRef.current.setFieldsValue(this.props.query);
      this.forceUpdate(() => {
        this.props.onSearch(this.props.query);
      });
    }
  }

  handleSubmit = (value) => {
    this.updateQuery(value);
    this.props.dispatch({
      type: 'table/updatePaging',
      payload: {
        tableKey: this.props.formKey,
        search: true,
      },
    });
    this.forceUpdate(() => {
      this.props.onSearch(value);
    });
  };
  handleExport = () => {
    this.forceUpdate(() => {
      this.props.onExport(this.props.query);
    });
  };
  updateQuery = (value) => {
    const formValues = {
      ...value,
    };
    for (let i in formValues) {
      if (formValues[i] && typeof formValues[i] == 'string') {
        formValues[i] = formValues[i].trim();
      }
    }
    this.handleDateRangeValue(formValues);
    this.props.dispatch({
      type: 'form/updateQuery',
      payload: {
        formKey: this.props.formKey,
        value: formValues,
      },
    });
  };

  handleDateRangeValue = (value) => {
    const rangeConfigList = this.props.group.filter(
      (item) => typeof item === 'object' && value[item.name] && Array.isArray(item.dateRangeValueKeys),
    );
    rangeConfigList.forEach((config) => {
      try {
        const { dateRangeValueKeys, name, formatType } = config;
        const [startKey, endKey] = dateRangeValueKeys;
        const _rangeValue = value[name];
        const [startValue, endValue] = _rangeValue;
        if (startValue && endValue) {
          value[startKey] = startValue.format(formatType || dateFormat);
          value[endKey] = endValue.format(formatType || dateFormat);
          delete value[name];
        }
      } catch (e) {}
    });
  };
  handleFormReset = () => {
    this.formRef.current.resetFields();
    this.updateQuery();
  };

  renderOperFormItem = () => {
    return (
      <div className="ccform-oper">
        <Button size="small" type="primary" htmlType="submit">
          查询
        </Button>
        <Button size="small" style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
          重置
        </Button>
        {this.props.enableExport && (
          <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleExport} loading={this.props.isExporting}>
            {this.props.exportName || '导出报表'}
          </Button>
        )}
      </div>
    );
  };
  renderDefaultValues = () => {
    const { group = [] } = this.props;
    const initialValues = {};
    group
      .filter((item) => typeof item.$$typeof !== 'symbol' && typeof item === 'object')
      .forEach((item) => {
        if (item.defaultValue !== undefined) {
          initialValues[item.name] = item.defaultValue;
        }
      });
    return initialValues;
  };

  renderFormItem = (item) => {
    if (typeof item === 'function') {
      return item();
    } else if (typeof item.$$typeof === 'symbol') {
      return item;
    } else if (typeof item === 'object') {
      const { label, name, render, required, lg } = item;
      return (
        <Col lg={lg || 6} md={24} key={name}>
          <FormItem label={label} name={name} required={required}>
            {typeof render === 'function' ? render() : <Input placeholder={`请输入${label}`} />}
          </FormItem>
        </Col>
      );
    }
  };

  render() {
    const { path, group = [] } = this.props;
    return (
      <FormArea>
        <Form
          onFinish={this.handleSubmit}
          ref={this.formRef}
          className="ccform"
          initialValues={this.renderDefaultValues()}
          size="small"
          layout="inline"
        >
          <Row gutter={16}>{group.map(this.renderFormItem)}</Row>
          {this.renderOperFormItem()}
        </Form>
      </FormArea>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const { formKey } = ownProps;
  return {
    query: _get(store.form, `value.${formKey}`),
  };
};

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(CCForm);
