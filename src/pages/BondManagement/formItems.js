import { Col, DatePicker, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

const distributorName = (
  <Col lg={6} md={24} key={'distributorName'}>
    <FormItem label="经销商名称" name="distributorName">
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);
const ewName = (
  <Col lg={6} md={24} key={'ewName'}>
    <FormItem label="二网名称" name="ewName">
      <Input placeholder="请输入二网名称" />
    </FormItem>
  </Col>
);
const isExport = {
  label: '是否导出',
  name: 'isExport',
  defaultValue: -1,
  render: () => EBDic.mapToSelect('commonDic'),
};
const isfirst = {
  label: '业务类型',
  name: 'isfirst',
  defaultValue: -1,
  render: () => EBDic.mapToSelect('isfirstDicList'),
};
const bankAuditTime = {
  label: '复审日期',
  name: 'bankAuditTime',
  lg: 7,
  dateRangeValueKeys: ['fsStartTime', 'fsEndTime'],
  render: () => <RangePicker />,
};
const hasBond = {
  label: '是否有保证金',
  name: 'hasBond',
  lg: 5,
  defaultValue: -1,
  render: () => EBDic.mapToSelect('commonDic'),
};
const moneyGetType = {
  label: '保证金收取方式',
  name: 'moneyGetType',
  defaultValue: -1,
  render: () => EBDic.mapToSelect('moneyGetTypeDicList'),
};
const fldSerialName = (
  <Col lg={6} md={24} key={'fldSerialName'}>
    <FormItem label="品牌名称" name="fldSerialName">
      <Input placeholder="请输入品牌名称" />
    </FormItem>
  </Col>
);
const brandName = (
  <Col lg={6} md={24} key={'brandName'}>
    <FormItem label="品牌名称" name="brandName">
      <Input placeholder="请输入品牌名称" />
    </FormItem>
  </Col>
);
const exportType = {
  label: '导出类型',
  name: 'exportType',
  defaultValue: -1,
  render: () => EBDic.mapToSelect('exportTypeList'),
};

export const transferInFormList = [
  distributorName,
  ewName,
  isExport,
  isfirst,
  bankAuditTime,
  hasBond,
  moneyGetType,
  fldSerialName,
];

export const confirmReceiptFormList = [distributorName, brandName, exportType];
export const printManagementFormList = [distributorName, brandName];
