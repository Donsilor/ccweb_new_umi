import React from 'react';
import { Col, DatePicker, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
export const 经销商 = (
  <Col span={8} key={'custname'}>
    <FormItem label="经销商" name={'custname'}>
      <Input placeholder="请输入经销商" />
    </FormItem>
  </Col>
);
export const 业务编号 = (
  <Col span={8} key={'businesslogno'}>
    <FormItem label="业务编号" name={'businesslogno'}>
      <Input placeholder="请输入业务编号" />
    </FormItem>
  </Col>
);
export const 押品名称 = (
  <Col span={8} key={'goodsname'}>
    <FormItem label="押品名称" name={'goodsname'}>
      <Input placeholder="请输入押品名称" />
    </FormItem>
  </Col>
);
export const 押品代码 = (
  <Col span={8} key={'goodsno'}>
    <FormItem label="押品代码" name={'goodsno'}>
      <Input placeholder="请输入押品代码" />
    </FormItem>
  </Col>
);
export const VIN码 = (
  <Col span={8} key={'goodsidnumber'}>
    <FormItem label="VIN码" name={'goodsidnumber'}>
      <Input placeholder="请输入VIN码" />
    </FormItem>
  </Col>
);
export const 合格证编号 = (
  <Col span={8} key={'goodsvouchernumber'}>
    <FormItem label="合格证编号" name={'goodsvouchernumber'}>
      <Input placeholder="请输入合格证编号" />
    </FormItem>
  </Col>
);
export const 情况 = (
  <Col span={8} key={'reason'}>
    <FormItem label="情况" name={'reason'}>
      <Input placeholder="请输入情况" />
    </FormItem>
  </Col>
);
export const 供应链 = (
  <Col span={8} key={'supplyChain'}>
    <FormItem label="供应链" name={'supplyChain'}>
      <Input placeholder="请输入供应链" />
    </FormItem>
  </Col>
);
export const 导入日期 = {
  lg: 9,
  label: '导入日期',
  name: 'importDate',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['importStartDate', 'importEndDate'],
  render: () => <RangePicker />,
};
export const 推送状态 = {
  lg: 8,
  label: '推送状态',
  name: 'syncFlag',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={1} key={0}>
        已推送
      </Option>
      <Option value={0} key={1}>
        未推送
      </Option>
    </Select>
  ),
};
export const 推送车辆导入查看 = [经销商, 业务编号, 押品名称, VIN码, 合格证编号, 情况];
export const 推送车辆明细 = [经销商, 业务编号, 押品名称, 押品代码, VIN码, 合格证编号, 情况, 推送状态, 供应链, 导入日期];
