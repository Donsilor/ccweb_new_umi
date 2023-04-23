import React from 'react';
import { Col, DatePicker, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
export const 品牌名称 = (
  <Col span={6} key={'fld_serial'}>
    <FormItem label="品牌名称" name={'fld_serial'}>
      <Input placeholder="请输入品牌名称" />
    </FormItem>
  </Col>
);
export const 经销商 = {
  label: '经销商',
  name: 'distributorName',
};
export const 品牌与车型库 = [品牌名称];
