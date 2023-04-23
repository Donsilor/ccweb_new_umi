import React from 'react';
import { Col, DatePicker, Form, Input, Select } from 'antd';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const 发生日期FormItem = {
  label: '发生日期',
  name: 'dateRange',
  lg: 6,
  render: () => <RangePicker />,
};

const 二网名称FormItem = (
  <Col span={6} key={'ewName'}>
    <FormItem label="二网名称" name="ewName">
      <Input placeholder="请输入二网名称" />
    </FormItem>
  </Col>
);

const formItemList = [发生日期FormItem, 二网名称FormItem];

export default formItemList;
