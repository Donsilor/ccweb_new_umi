export const columnsCSin = [
  {
    title: '单号类型',
    dataIndex: 'oddType',
    render: (text) => (text < 3 ? '定期' : '活期'),
  },
  {
    title: '保证金金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '开始计息日期',
    dataIndex: 'interestStartDate',
    render: (text) => text && formatDate(text),
  },
];
export const columnsZJin = [
  {
    title: '单号类型',
    dataIndex: 'oddType',
    render: (text) => (text < 3 ? '定期' : '活期'),
  },
  {
    title: '保证金金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '开始计息日期',
    dataIndex: 'interestStartDate',
    render: (text) => text && formatDate(text),
  },
];
export const columnsOut = [
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '转出金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '计息截止日期',
    dataIndex: 'interestEndDate',
    render: (text) => text && formatDate(text),
  },
];
export const columnsIn = [
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '转入金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '计息开始日期',
    dataIndex: 'interestStartDate',
    render: (text) => text && formatDate(text),
  },
];

export const ewInfoConfirmColumn = [
  // 确认回执页面二网信息
  {
    title: '任务号',
    dataIndex: 'ewBankId',
    fixed: 'left',
  }, //任务号
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  }, // 经销商名称
  {
    title: '品牌名称',
    dataIndex: 'brandName',
  }, // 品牌名称
  {
    title: '二网名称',
    dataIndex: 'ewName',
  }, // 二网名称
  {
    title: '业务类型',
    dataIndex: 'businessType',
    align: 'center',
    render: (text) => translate(text, EBDic.isfirstDicList),
  }, // 业务类型 （是否续作）
  {
    title: '保证金类型',
    dataIndex: 'operationType',
    align: 'center',
    render: (text) => translate(text, EBDic.bondTypeDicList),
  }, // 保证金类型
  {
    title: '保证金（万元）',
    align: 'center',
    dataIndex: 'money',
  }, // 保证金
  {
    title: '复审通过时间',
    dataIndex: 'lastTime',
    align: 'center',
    render: formatTime,
  }, // 复审通过时间
];
