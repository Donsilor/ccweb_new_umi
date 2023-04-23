import React from 'react';
import moment from 'moment';
import { Col, DatePicker, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export const 经销商名称 = (
  <Col span={6} key={'dealerName'}>
    <FormItem label="经销商" name={'dealerName'}>
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
export const 年月 = {
  lg: 4,
  label: '年月',
  name: 'paramYearMonth',
  defaultValue: moment().subtract(1, 'months'),
  render: () => <DatePicker picker="month" allowClear={false} />,
};
export const 品牌名称 = (data) => {
  return {
    label: '品牌名称',
    name: 'brandName',
    defaultValue: null,
    render: () => (
      <Select showSearch={true}>
        <Option value={null}>全部</Option>
        {data.map((reason, i) => (
          <Option value={reason.name || reason.brand_name} key={i}>
            {reason.name || reason.brand_name}
          </Option>
        ))}
      </Select>
    ),
  };
};
export const 供应链名称 = (data, name) => {
  return {
    label: '供应链',
    name: name || 'tradername',
    defaultValue: null,
    render: () => (
      <Select showSearch={true}>
        <Option value={null}>全部</Option>
        {data.map((reason, i) => (
          <Option value={reason.name} key={i}>
            {reason.name}
          </Option>
        ))}
      </Select>
    ),
  };
};
export const 经销商 = (
  <Col span={6} key={'经销商'}>
    <FormItem label="经销商" name={'custname'}>
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
export const 标识 = (
  <Col span={6} key={'标识'}>
    <FormItem label="标识" name={'identification'}>
      <Input placeholder="请输入标识" />
    </FormItem>
  </Col>
);
export const 业务编号 = (
  <Col span={6} key={'业务编号'}>
    <FormItem label="业务编号" name={'bizno'}>
      <Input placeholder="请输入业务编号" />
    </FormItem>
  </Col>
);
export const 备注 = (
  <Col span={6} key={'备注'}>
    <FormItem label="备注" name={'remark'}>
      <Input placeholder="请输入备注" />
    </FormItem>
  </Col>
);
export const 押品状态 = {
  label: '押品状态',
  name: 'collstatus',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null}>全部</Option>
      {['在库', '在途', '已释放'].map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  ),
};
export const 监管方状态 = {
  label: '监管方状态',
  name: 'supervisorStatus',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null}>全部</Option>
      {['在库', '在途', '已释放'].map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  ),
};
export const 状态是否一致 = {
  label: '状态是否一致',
  name: 'consistentState',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null}>全部</Option>
      {['是', '否'].map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  ),
};
export const 监管方 = (data, name) => {
  return {
    label: '监管方',
    name: name || 'supervisor',
    defaultValue: null,
    render: () => (
      <Select>
        <Option value={null} key={-1}>
          全部
        </Option>
        {['长久', '易鸿', '安信', '华阳', '税控', '中都'].map((v) => (
          <Option value={v} key={v}>
            {v}
          </Option>
        ))}
      </Select>
    ),
  };
};
export const 生成日期 = {
  lg: 9,
  label: '生成日期',
  name: 'generateTime',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['generateTimeStart', 'generateTimeEnd'],
  render: () => <RangePicker />,
};
export const 发车状态 = {
  label: '发车状态',
  name: 'departStatus',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null}>全部</Option>
      {['已发货', '已到货', '已退货'].map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  ),
};
export const 备注情况 = (data) => {
  return {
    label: '备注情况',
    name: 'remarkSituationCode',
    defaultValue: null,
    render: () => (
      <Select>
        <Option value={null}>全部</Option>
        {data.map((item) => (
          <Option value={item.code} key={item.code}>
            {item.name}
          </Option>
        ))}
      </Select>
    ),
  };
};
export const 实际情况押品状态 = {
  label: '押品状态',
  name: 'pledgeStatus',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null}>全部</Option>
      {['在库', '在途', '已释放'].map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  ),
};
export const 经销商品牌供应链 = [年月, 经销商名称];
export const 车辆汇总表 = [经销商, 标识, 业务编号, 备注, 押品状态, 监管方状态, 状态是否一致];
