import Trend from '@/components/Trend';
import BigNumber from 'bignumber.js';
import { Badge } from 'antd';

const 任务号col = {
  title: '任务号',
  dataIndex: 'ewBankId',
  fixed: 'left',
};
const 银行名称col = {
  title: '银行名称',
  dataIndex: 'bankName',
};
const 经销商名称col = {
  title: '经销商名称',
  dataIndex: 'distributorName',
  width: 200,
};
const 二网名称col = {
  title: '二网名称',
  dataIndex: 'ewName',
};
const 品牌名称col = {
  title: '品牌名称',
  dataIndex: 'fldSerial',
};
const 品牌名称col2 = {
  title: '品牌名称',
  dataIndex: 'brandName',
};
const 业务类型col = {
  title: '业务类型',
  dataIndex: 'isfirst',
  align: 'center',
  render: (text) => translate(text, EBDic.isfirstDicList),
};
const 保证金万元col = {
  title: '保证金（万元）',
  align: 'right',
  dataIndex: 'money',
  render: (text, record) => (
    <Trend flag={record.operationType === 2 ? 'down' : 'up'}>{record.operationType === 2 ? `-${text}` : `+${text}`}</Trend>
  ),
};
const 保证金类型col = {
  title: '保证金类型',
  dataIndex: 'operationType',
  align: 'center',
  render: (text) => translate(text, EBDic.bondTypeDicList),
};
const 保证金万元AdjustColumn = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'adjustMoney',
  render: (text, record) => (
    <Trend flag={record.operationType === 2 ? 'down' : 'up'}>{record.operationType === 2 ? `-${text}` : `+${text}`}</Trend>
  ),
};
const 是否有保证金col = {
  title: '是否有保证金',
  dataIndex: 'hasBond',
  align: 'center',
  render: (text, record) => (record.moneyGetType == 1 || record.moneyGetType == 2 ? '是' : '否'),
};
const 保证金收取方式col = {
  title: '保证金收取方式',
  dataIndex: 'moneyGetType',
  align: 'center',
  render: (text) => (text == 1 ? '按店' : text == 2 ? '按台' : '无'),
};
const 保证金账号col = {
  title: '保证金账号',
  dataIndex: 'bondAccount',
};
const 分账号col = {
  title: '分账号',
  dataIndex: 'pointsAccount',
};
const 结算账号col = {
  title: '结算账号',
  dataIndex: 'settlementAccount',
};
const 利率col = {
  title: '利率(%)',
  dataIndex: 'interestRate',
};
const 是否导出col = {
  title: '是否导出',
  dataIndex: 'printNum',
  align: 'center',
  render: (text) => (text >= 1 ? '是' : '否'),
};
const 复审通过时间col = {
  title: '复审通过时间',
  dataIndex: 'affectTime',
  align: 'center',
  render: (text) => {
    return text && text.time && formatTime(text.time);
  },
};
const 保证金元col = {
  title: '保证金（元）',
  dataIndex: 'depositTotal',
  render: (text) => {
    let x = new BigNumber(text);
    return x.multipliedBy(10000).toFormat();
  },
};
const 二网数量col = {
  title: '二网数量',
  dataIndex: 'ewNum',
};
const pointsAccountColumn = {
  title: '分账号',
  dataIndex: 'pointsAccount',
};
const settlementAccountColumn = {
  title: '结算账号',
  dataIndex: 'settlementAccount',
};
const remittanceAccountColumn = {
  title: '应解汇款账号',
  dataIndex: 'remittanceAccount',
};
const 导出时间col = {
  title: '导出时间',
  dataIndex: 'exportTime',
  align: 'center',
  render: (text) => text && text.time && formatDate(text.time),
};
const exportTypeColumn = {
  title: '导出类型',
  dataIndex: 'exportType',
  align: 'center',
  render: (text) => translate(text, EBDic.exportTypeDicList),
};
const exceptionLableColumn = {
  title: '异常预警',
  dataIndex: 'exceptionLable',
  render: (text) => (text && <Badge status={'error'} text={text} />) || '',
};
const confirmStatusColumn = {
  title: '确认回执状态',
  dataIndex: 'confirmStatus',
  fixed: 'right',
  width: 120,
  render: (text) => text !== undefined && translatePureDic(text, EBDic.confirmStatusDic, true),
};
const 业务状态Column = {
  title: '业务状态',
  fixed: 'right',
  dataIndex: 'status',
  width: 120,
  render: (text) => translatePureDic(text, EBDic.statusDicList, true),
};
const 打印管理任务号col = {
  title: '任务号',
  dataIndex: 'id',
};
const 打印管理导出时间col = {
  title: '导出时间',
  dataIndex: 'operTime',
  align: 'center',
  render: (text) => text && text.time && formatTime(text.time),
};
const operNameColumn = {
  title: '操作人',
  dataIndex: 'operName',
};

export const transferInColumnList = [
  任务号col,
  银行名称col,
  经销商名称col,
  二网名称col,
  品牌名称col,
  业务类型col,
  保证金万元col,
  保证金类型col,
  是否有保证金col,
  保证金收取方式col,
  保证金账号col,
  分账号col,
  结算账号col,
  利率col,
  是否导出col,
  复审通过时间col,
];
export const transferOutColumnList = [...transferInColumnList];
export const confirmReceiptColumnList = [
  银行名称col,
  品牌名称col2,
  经销商名称col,
  二网数量col,
  保证金账号col,
  pointsAccountColumn,
  settlementAccountColumn,
  remittanceAccountColumn,
  导出时间col,
  exportTypeColumn,
  exceptionLableColumn,
  confirmStatusColumn,
];
export const pmColumnList = [
  银行名称col,
  品牌名称col2,
  经销商名称col,
  保证金元col,
  二网数量col,
  保证金账号col,
  remittanceAccountColumn,
  pointsAccountColumn,
  settlementAccountColumn,
];
export const pmExportHisColumnList = [打印管理导出时间col, operNameColumn, exportTypeColumn];
export const pmModalColumnList = [
  打印管理任务号col,
  二网名称col,
  业务类型col,
  保证金类型col,
  保证金万元AdjustColumn,
  复审通过时间col,
  业务状态Column,
];
