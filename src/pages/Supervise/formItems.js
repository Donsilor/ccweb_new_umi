import { Col, DatePicker, Input, Form } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const bankAuditTime = {
  label: '抽查日期',
  name: 'dateRange',
  lg: 7,
  render: () => <RangePicker />,
};
const dealerFormItem = (
  <Col span={6} key={'dealer'}>
    <FormItem label="经销商名称" name="dealer">
      <Input placeholder="请输入经销商名称" />
    </FormItem>
  </Col>
);

const statusTypeFormItem = {
  label: '是否有效',
  name: 'status',
  render: () => EBDic.mapToSelect('statusTypeList'),
};

export const managerForm = [bankAuditTime];
export const specialDealerForm = [dealerFormItem, statusTypeFormItem];
