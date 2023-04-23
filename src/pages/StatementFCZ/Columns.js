import { tranCode } from '@/utils/dict';
const 经销商 = {
  title: '经销商名称',
  dataIndex: 'custname',
};
const 业务编号 = {
  title: '业务编号',
  dataIndex: 'bizno',
};
const 监管方 = {
  title: '监管方',
  dataIndex: 'supervisor',
};
const 发车日期 = {
  title: '发车日期',
  dataIndex: 'outputdate',
};
const 供应链 = {
  title: '供应链',
  dataIndex: 'tradername',
};
const 标识 = {
  title: '标识',
  dataIndex: 'identification',
};
const 新价格 = {
  title: '新价格',
  dataIndex: 'unitprice',
};
const 押品状态 = {
  title: '押品状态',
  dataIndex: 'collstatus',
};
const 监管方状态 = {
  title: '监管方状态',
  dataIndex: 'supervisorStatus',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 押品状态监管方状态是否一致 = {
  title: '押品状态/监管方状态是否一致',
  dataIndex: 'consistentState',
};
const 大众厂家状态 = {
  title: '大众厂家状态',
  dataIndex: 'dazhongFactoryStatus',
};
const 大众厂家时间 = {
  title: '大众厂家时间',
  dataIndex: 'dazhongFactoryTime',
};
const 解放车辆状态 = {
  title: '解放车辆状态',
  dataIndex: 'jiefangCarStatus',
};
const 零售日期 = {
  title: '零售日期',
  dataIndex: 'retailDate',
};
const 邮寄状态 = {
  title: '邮寄状态',
  dataIndex: 'postStatus',
};
const 邮寄日期 = {
  title: '邮寄日期',
  dataIndex: 'postDate',
};
const 仓库属性 = {
  title: '仓库属性',
  dataIndex: 'warehouseProperties',
};

const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'dealerName',
};
const 年月 = {
  title: '年月',
  dataIndex: 'stateYearMonth',
};
const 品牌名称 = {
  title: '品牌名称',
  dataIndex: 'brandName',
};
const 末次还款日期 = {
  title: '末次还款日期',
  dataIndex: 'lastPaymentDate',
};
const 距今几天没有赎车 = {
  title: '距今N天没有赎车',
  dataIndex: 'noRedeemCarDays',
};
const 本月销量 = {
  title: '本月销量',
  dataIndex: 'curMonthSalesVolume',
};
const 上月销量 = {
  title: '上月销量',
  dataIndex: 'lastMonthSalesVolume',
};
const 供应链名称 = {
  title: '供应链名称',
  dataIndex: 'supplyChain',
};
const 距今N天没有出账 = {
  title: '距今N天没有出账',
  dataIndex: 'noAccountDays',
};
const 销量较上月涨幅降幅 = {
  title: '较上月涨幅／降幅',
  dataIndex: 'salesVolumeClmIncRate',
};
const 销量较上半年平均值涨幅降幅 = {
  title: '较上半年平均值涨幅/降幅',
  dataIndex: 'salesVolumeChyIncRate',
};
const 销量较去年同期涨幅降幅 = {
  title: '较去年同期涨幅/降幅',
  dataIndex: 'salesVolumeSplIncRate',
};
const 销量较上一年平均值涨幅降幅 = {
  title: '较上一年平均值涨幅/降幅',
  dataIndex: 'salesVolumeLyIncRate',
};
const 本月回款 = {
  title: '本月回款',
  dataIndex: 'curMonthActualPayment',
};
const 上月回款 = {
  title: '上月回款',
  dataIndex: 'lastMonthActualPayment',
};
const 回款较上月涨幅降幅 = {
  title: '较上月涨幅/降幅',
  dataIndex: 'actualPaymentClmIncRate',
};
const 回款较上半年平均值涨幅降幅 = {
  title: '较上半年平均值涨幅/降幅',
  dataIndex: 'actualPaymentChyIncRate',
};
const 回款较去年同期涨幅降幅 = {
  title: '较去年同期涨幅/降幅',
  dataIndex: 'actualPaymentSplIncRate',
};
const 回款较上一年平均值涨幅降幅 = {
  title: '较上一年平均值涨幅/降幅',
  dataIndex: 'actualPaymentLyIncRate',
};
const 整体供应链 = {
  title: '整体供应链',
  dataIndex: 'supplyChainSalesVolumeClmIncRate',
};
const 差值 = {
  title: '差值',
  dataIndex: 'differenceValue',
};
const 客户经理 = {
  title: '客户经理',
  dataIndex: 'custManager',
};
const 单价 = {
  title: '单价',
  dataIndex: 'unitprice',
};
const 备注情况 = {
  title: '备注情况',
  dataIndex: 'remarkSituationCode',
  render: (text) => tranCode(text),
};
const 备注原因 = {
  title: '备注原因',
  dataIndex: 'remarkReasonCode',
  render: (text) => tranCode(text),
};
const 备注内容 = {
  title: '备注内容',
  dataIndex: 'remarkContent',
};
const 发车状态 = {
  title: '发车状态',
  dataIndex: 'departStatus',
};
const 押品状态1 = {
  title: '押品状态',
  dataIndex: 'pledgeStatus',
};
const 关联时间 = {
  title: '关联时间',
  dataIndex: 'correlationTime',
};
const 赎车时间 = {
  title: '赎车时间',
  dataIndex: 'repaydate',
};
const 跟踪结果 = {
  title: '跟踪结果',
  dataIndex: 'trackingResultName',
};
const 监管方1 = {
  title: '监管方',
  dataIndex: 'regulator',
};
export const collectColumns = [
  监管方,
  发车日期,
  经销商,
  供应链,
  标识,
  新价格,
  押品状态,
  业务编号,
  监管方状态,
  备注,
  押品状态监管方状态是否一致,
  大众厂家状态,
  大众厂家时间,
  解放车辆状态,
  零售日期,
  邮寄状态,
  邮寄日期,
  仓库属性,
];
export const dealerColumns = [
  年月,
  经销商名称,
  品牌名称,
  供应链名称,
  末次还款日期,
  距今几天没有赎车,
  距今N天没有出账,
  {
    title: '销量台数',
    children: [
      本月销量,
      上月销量,
      销量较上月涨幅降幅,
      销量较上半年平均值涨幅降幅,
      销量较去年同期涨幅降幅,
      销量较上一年平均值涨幅降幅,
    ],
  },
  {
    title: '回款金额',
    children: [
      本月回款,
      上月回款,
      回款较上月涨幅降幅,
      回款较上半年平均值涨幅降幅,
      回款较去年同期涨幅降幅,
      回款较上一年平均值涨幅降幅,
    ],
  },
];
export const brandColumns = [
  年月,
  品牌名称,
  {
    title: '销量台数',
    children: [
      本月销量,
      上月销量,
      销量较上月涨幅降幅,
      销量较上半年平均值涨幅降幅,
      销量较去年同期涨幅降幅,
      销量较上一年平均值涨幅降幅,
    ],
  },
  {
    title: '回款金额',
    children: [
      本月回款,
      上月回款,
      回款较上月涨幅降幅,
      回款较上半年平均值涨幅降幅,
      回款较去年同期涨幅降幅,
      回款较上一年平均值涨幅降幅,
    ],
  },
];
export const supplyChainColumns = [
  年月,
  品牌名称,
  供应链名称,
  {
    title: '销量台数',
    children: [
      本月销量,
      上月销量,
      销量较上月涨幅降幅,
      销量较上半年平均值涨幅降幅,
      销量较去年同期涨幅降幅,
      销量较上一年平均值涨幅降幅,
    ],
  },
  {
    title: '回款金额',
    children: [
      本月回款,
      上月回款,
      回款较上月涨幅降幅,
      回款较上半年平均值涨幅降幅,
      回款较去年同期涨幅降幅,
      回款较上一年平均值涨幅降幅,
    ],
  },
];
export const exceptionColumns = [
  年月,
  经销商名称,
  客户经理,
  供应链名称,
  {
    title: '供应链',
    children: [
      {
        title: '敞口',
        dataIndex: 'exposureAmount',
      },
      {
        title: '情况',
        dataIndex: 'dealerException',
      },
      {
        title: '等级',
        dataIndex: 'dealerRank',
      },
      {
        title: '最早出账日',
        dataIndex: 'firstAccountDate',
      },
    ],
  },
  末次还款日期,
  距今几天没有赎车,
  距今N天没有出账,
  {
    title: '销量台数',
    children: [
      本月销量,
      上月销量,
      销量较上月涨幅降幅,
      整体供应链,
      差值,
      销量较上半年平均值涨幅降幅,
      销量较去年同期涨幅降幅,
      销量较上一年平均值涨幅降幅,
    ],
  },
  {
    title: '回款金额',
    children: [
      本月回款,
      上月回款,
      回款较上月涨幅降幅,
      回款较上半年平均值涨幅降幅,
      回款较去年同期涨幅降幅,
      回款较上一年平均值涨幅降幅,
    ],
  },
];
export const carListColumns = [监管方1, 经销商, 标识, 单价, 供应链, 业务编号];
export const allListColumns = [
  监管方1,
  经销商,
  标识,
  单价,
  押品状态1,
  发车状态,
  供应链,
  业务编号,
  关联时间,
  赎车时间,
  备注情况,
  备注原因,
  备注内容,
  跟踪结果,
];
export const importColumns = [监管方1, 经销商, 标识, 单价, 押品状态1, 发车状态, 供应链, 业务编号, 备注情况, 备注原因, 备注内容];
