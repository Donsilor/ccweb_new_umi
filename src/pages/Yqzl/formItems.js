import React from 'react';
import { Col, DatePicker, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export const 标识 = (
  <Col span={6} key={'identification'}>
    <FormItem label="标识" name={'identification'}>
      <Input placeholder="请输入标识" />
    </FormItem>
  </Col>
);
export const 业务编号 = (
  <Col key={'bizno'}>
    <FormItem label="业务编号" name={'bizno'}>
      <Input placeholder="请输入业务编号" />
    </FormItem>
  </Col>
);
export const 创建时间 = {
  lg: 9,
  label: '创建时间',
  name: 'createDate',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['createStartDate', 'createEndDate'],
  render: () => <RangePicker />,
};
export const 导入记录状态 = {
  label: '状态',
  name: 'status',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={0} key={0}>
        已导入
      </Option>
      <Option value={1} key={1}>
        待处理
      </Option>
      <Option value={2} key={2}>
        导入失败
      </Option>
      <Option value={3} key={3}>
        之后需跟进
      </Option>
    </Select>
  ),
};
export const 赎回记录状态 = {
  label: '状态',
  name: 'status',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={0} key={0}>
        赎回成功
      </Option>
      <Option value={1} key={1}>
        待处理
      </Option>
      <Option value={2} key={2}>
        赎回失败
      </Option>
    </Select>
  ),
};
export const 经销商 = (
  <Col span={6} key={'distributorName'}>
    <FormItem label="经销商" name={'distributorName'}>
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
export const custname = (
  <Col key={'custname'}>
    <FormItem label="经销商" name={'custname'}>
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
export const 车架号 = (
  <Col span={6} key={'chassis'}>
    <FormItem label="车架号" name={'chassis'}>
      <Input placeholder="请输入车架号" />
    </FormItem>
  </Col>
);
export const 银行车架号 = {
  label: '银行车架号',
  name: 'chassisBank',
};
export const vin = (
  <Col key={'vin'}>
    <FormItem label="车架号" name={'vin'}>
      <Input placeholder="请输入车架号" />
    </FormItem>
  </Col>
);
export const 品牌 = (
  <Col span={6} key={'brandName'}>
    <FormItem label="品牌" name={'brandName'}>
      <Input placeholder="请输入品牌" />
    </FormItem>
  </Col>
);
export const tradername = (
  <Col span={6} key={'tradername'}>
    <FormItem label="品牌" name={'tradername'}>
      <Input placeholder="请输入品牌" />
    </FormItem>
  </Col>
);
export const 供应链 = (
  <Col span={6} key={'supplyChain'}>
    <FormItem label="供应链" name={'supplyChain'}>
      <Input placeholder="请输入供应链" />
    </FormItem>
  </Col>
);
export const 银行名称 = (
  <Col span={6} key={'bankName'}>
    <FormItem label="银行名称" name={'bankName'}>
      <Input placeholder="请输入银行名称" />
    </FormItem>
  </Col>
);
export const 备注 = (
  <Col span={6} key={'remark'}>
    <FormItem label="备注" name={'remark'}>
      <Input placeholder="请输入备注" />
    </FormItem>
  </Col>
);
export const 录入时间 = {
  lg: 9,
  label: '录入时间',
  name: 'lrTime',
  dateRangeValueKeys: ['lrStart', 'lrEnd'],
  render: () => <RangePicker />,
};
export const 入库时间 = {
  label: '入库时间',
  name: 'putintime',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['putintimeStart', 'putintimeEnd'],
  render: () => <RangePicker style={{ width: '250px' }} />,
};
export const 车辆明细入库时间 = {
  label: '入库时间',
  name: 'putintime',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['startPutintime', 'endPutintime'],
  render: () => <RangePicker style={{ width: '250px' }} />,
};
export const 释放时间 = {
  label: '释放时间',
  name: 'repaydatetime',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['repaydateStart', 'repaydateEnd'],
  render: () => <RangePicker style={{ width: '250px' }} />,
};
export const 导入方式 = {
  label: '导入方式',
  name: 'dataSource',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={'sync'} key={0}>
        数据同步
      </Option>
      <Option value={'manual'} key={1}>
        手动导入
      </Option>
      <Option value={'sync_cyt'} key={2}>
        车银通对接
      </Option>
    </Select>
  ),
};
const 上传时间 = (
  <Col span={6} key={'uploadTime'}>
    <FormItem label="上传时间" name="uploadTime">
      <DatePicker />
    </FormItem>
  </Col>
);
export const 发送结果 = {
  label: '发送结果',
  name: 'sendResultType',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={1} key={0}>
        成功
      </Option>
      <Option value={0} key={1}>
        失败
      </Option>
    </Select>
  ),
};
export const 融资模式 = {
  label: '融资模式',
  name: 'singlepool',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={'S'} key={1}>
        单笔
      </Option>
      <Option value={'P'} key={2}>
        池
      </Option>
    </Select>
  ),
};
export const 发票包含范围 = {
  label: '发票包含范围',
  name: 'invoiceType',
  defaultValue: 1,
  render: () => (
    <Select>
      <Option value={0} key={-1}>
        全部
      </Option>
      <Option value={1} key={1}>
        车辆
      </Option>
      <Option value={2} key={2}>
        非车辆
      </Option>
    </Select>
  ),
};
export const 开票日期 = {
  lg: 9,
  label: '开票日期',
  name: 'kprq',
  dateRangeValueKeys: ['kprqStart', 'kprqEnd'],
  render: () => <RangePicker />,
};
export const 获取时间 = {
  lg: 9,
  label: '获取时间',
  name: 'createTime',
  dateRangeValueKeys: ['getDataStartTime', 'getDataEndTime'],
  render: () => <RangePicker />,
};
export const 发票状态 = {
  label: '发票状态',
  name: 'fpzt',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={1} key={1}>
        正常
      </Option>
      <Option value={3} key={2}>
        冲红
      </Option>
      <Option value={8} key={3}>
        失控
      </Option>
      <Option value={9} key={4}>
        异常
      </Option>
    </Select>
  ),
};
export const 实时总敞口 = {
  label: '实时总敞口',
  name: 'availexportamtStr',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={'0'} key={1}>
        等于0
      </Option>
      <Option value={'1'} key={2}>
        不为0
      </Option>
      <Option value={'-1'} key={2}>
        空
      </Option>
    </Select>
  ),
};
export const 是否结清 = {
  label: '是否结清',
  name: 'settlement',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={1} key={1}>
        是
      </Option>
      <Option value={0} key={2}>
        否
      </Option>
    </Select>
  ),
};
export const 实时敞口金额 = {
  label: '实时敞口金额',
  name: 'availexportamtZeroFlag',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={0} key={1}>
        等于0
      </Option>
      <Option value={1} key={2}>
        不为0
      </Option>
    </Select>
  ),
};
const 供应链名称 = (
  <Col key={'供应链'}>
    <FormItem label="供应链" name={'tradername'}>
      <Input placeholder="请输入供应链名称" />
    </FormItem>
  </Col>
);
const 核心企业 = (
  <Col key={'核心企业'}>
    <FormItem label="核心企业" name={'corecustname'}>
      <Input placeholder="请输入核心企业名称" />
    </FormItem>
  </Col>
);
export const 起始日期 = {
  lg: 9,
  label: '起始日期',
  name: '起始日期',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['startStartdate', 'endStartdate'],
  render: () => <RangePicker />,
};
export const 到期日 = {
  lg: 9,
  label: '到期日',
  name: '到期日',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['startEnddate', 'endEnddate'],
  render: () => <RangePicker />,
};
const 贸易商名称 = (
  <Col key={'贸易商名称'}>
    <FormItem label="贸易商名称" name={'tradername'}>
      <Input placeholder="请输入贸易商名称" />
    </FormItem>
  </Col>
);
export const 业务类型 = {
  label: '业务类型',
  name: 'operType',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      <Option value={'10'} key={1}>
        还款
      </Option>
      <Option value={'20'} key={2}>
        赎车
      </Option>
      <Option value={'30'} key={3}>
        保证金调整
      </Option>
    </Select>
  ),
};
export const 发车时间 = {
  lg: 9,
  label: '发车时间',
  name: '发车时间',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['startOutputdate', 'endOutputdate'],
  render: () => <RangePicker />,
};
export const 结清日期 = {
  lg: 9,
  label: '结清日期',
  name: '结清日期',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['settlementStartDate', 'settlementEndDate'],
  render: () => <RangePicker />,
};
export const 赎车时间 = {
  lg: 9,
  label: '赎车时间',
  name: '赎车时间',
  formatType: 'YYYY/MM/DD',
  dateRangeValueKeys: ['startRepaydate', 'endRepaydate'],
  render: () => <RangePicker />,
};
export const 押品状态 = {
  label: '押品状态',
  name: 'pledgeStatus',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      {['在途', '在库', '已释放'].map((v) => (
        <Option value={v} key={v}>
          {v}
        </Option>
      ))}
    </Select>
  ),
};
export const 业务品种 = {
  label: '业务品种',
  name: 'finclassname',
  defaultValue: null,
  render: () => (
    <Select>
      <Option value={null} key={-1}>
        全部
      </Option>
      {['电票', '电子银承汇票', '流动资金贷款', '自由贷'].map((v) => (
        <Option value={v} key={v}>
          {v}
        </Option>
      ))}
    </Select>
  ),
};
export const 监管简称 = {
  label: '监管简称',
  name: 'regulator',
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
export const 批次号 = {
  lg: 7,
  label: '批次号',
  name: 'batchNo',
};
export const 发票号码 = {
  label: '发票号码',
  name: 'fphm',
};
export const 车辆明细上报 = [标识, 业务编号, 创建时间];
export const 橙E格式导入记录 = [经销商, 银行车架号, 导入记录状态, 供应链, 银行名称, 导入方式];
export const 车辆赎回导入记录 = [经销商, 车架号, 赎回记录状态, 银行名称];
export const 橙E格式详情 = [经销商, 银行车架号, 导入记录状态, 供应链, 备注];
export const 车辆赎回详情 = [经销商, 车架号, tradername, 赎回记录状态, 备注, 录入时间];

export const 数据同步车辆入库 = [custname, 业务编号, vin, 创建时间, 入库时间];
export const 数据同步赎车明细 = [custname, 业务编号, vin, 创建时间, 释放时间];
export const 数据同步发车明细 = [
  custname,
  业务编号,
  标识,
  供应链名称,
  押品状态,
  批次号,
  发车时间,
  创建时间,
  赎车时间,
  车辆明细入库时间,
];
export const 数据同步经销商列表 = [custname, 实时总敞口, 核心企业, 监管简称, 创建时间];
export const 数据同步经销商出账信息 = [
  custname,
  业务编号,
  融资模式,
  是否结清,
  实时敞口金额,
  核心企业,
  贸易商名称,
  业务品种,
  创建时间,
  起始日期,
  到期日,
  结清日期,
];
export const 数据同步单笔业务敞口更新 = [custname, 业务编号, 业务类型, 创建时间];
export const 数据同步单笔业务到期结清 = [custname, 业务编号, 创建时间];
export const 数据同步经销商贸易商列表 = [custname, 实时总敞口, 贸易商名称];

export const 车辆明细对账明细 = [上传时间];
export const 车辆明细对账发送结果 = [发送结果];
export const 车辆明细对邮箱维护 = [经销商];

export const 航信对接数据 = [经销商, 车架号, 发票包含范围, 发票状态, 发票号码, 开票日期, 获取时间];
