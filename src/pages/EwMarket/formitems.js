import React from 'react';
import { Col, DatePicker, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export const 经销商col = (
  <Col span={6} key={'dealerName'}>
    <FormItem label="经销商" name={'dealerName'}>
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
export const 品牌col = (
  <Col span={6} key={'name'}>
    <FormItem label="品牌" name={'name'}>
      <Input placeholder="请输入品牌" />
    </FormItem>
  </Col>
);
export const 二网名称col = (
  <Col span={6} key={'agentName'}>
    <FormItem label="二网名称" name={'agentName'}>
      <Input placeholder="请输入二网名称" />
    </FormItem>
  </Col>
);
export const 汽车厂商col = (
  <Col span={6} key={'manufacturerName'}>
    <FormItem label="汽车厂商" name={'manufacturerName'}>
      <Input placeholder="请输入汽车厂商" />
    </FormItem>
  </Col>
);
export const 车架号col = (
  <Col span={6} key={'vin'}>
    <FormItem label="车架号" name={'vin'}>
      <Input placeholder="请输入车架号" />
    </FormItem>
  </Col>
);
export const 创建时间col = {
  label: '创建时间',
  name: 'createDate',
  lg: 7,
  dateRangeValueKeys: ['createStartDate', 'createEndDate'],
  render: () => <RangePicker />,
};
export const 最后提交时间col = {
  label: '最后提交时间',
  name: 'updateDate',
  lg: 7,
  dateRangeValueKeys: ['updateStartDate', 'updateEndDate'],
  render: () => <RangePicker />,
};

export const 任务状态col = {
  label: '任务状态',
  name: 'auditStatus',
  defaultValue: null,
  render: () => EBDic.mapToSelect('auditStatus'),
};

export const marketFormItems = [
  经销商col,
  任务状态col,
  品牌col,
  二网名称col,
  汽车厂商col,
  车架号col,
  创建时间col,
  最后提交时间col,
];
