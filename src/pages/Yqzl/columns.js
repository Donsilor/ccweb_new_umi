const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'distributorName',
};
const 银行 = {
  title: '银行',
  dataIndex: 'bankName',
};
const custname = {
  title: '经销商名称',
  dataIndex: 'custname',
};
const 发车日期 = {
  title: '发车日期',
  dataIndex: 'departtime',
};
const 申请号 = {
  title: '申请号',
  dataIndex: 'applyNo',
};
const supplyChain = {
  title: '供应链',
  dataIndex: 'supplyChain',
};
const tradername = {
  title: '品牌',
  dataIndex: 'tradername',
};
const 商品代码 = {
  title: '商品代码',
  dataIndex: 'goodsCode',
};
const 商品名称 = {
  title: '商品名称',
  dataIndex: 'goodsName',
};
const 凭证号 = {
  title: '凭证号',
  dataIndex: 'voucherno',
};
const 核心厂商发货时间 = {
  title: '核心厂商发货时间',
  dataIndex: 'firmsSendtime',
};
const 入库时间 = {
  title: '入库时间',
  dataIndex: 'intime',
};
const 押品状态 = {
  title: '押品状态',
  dataIndex: 'pledgeStatus',
};
const 业务编号 = {
  title: '业务编号',
  dataIndex: 'businessNo',
};
const 发车状态 = {
  title: '发车状态',
  dataIndex: 'departStatus',
};
const 车辆出库时间 = {
  title: '车辆出库时间',
  dataIndex: 'carOutboundTime',
};
const 始发地 = {
  title: '始发地',
  dataIndex: 'originPlace',
};
const 预计到店时间 = {
  title: '预计到店时间',
  dataIndex: 'estimateArriveTime',
};
const 接收地址 = {
  title: '接收地址',
  dataIndex: 'receiveAddress',
};
const 全底盘号 = {
  title: '全底盘号',
  dataIndex: 'fullChassisNo',
};
const 推送备注信息 = {
  title: '推送备注信息',
  dataIndex: 'pushRemark',
};
const 状态 = {
  title: '状态',
  dataIndex: 'statusName',
};
const flagName = {
  title: '状态',
  dataIndex: 'flagName',
};
const 最后处理时间 = {
  title: '最后处理时间',
  dataIndex: 'handletime',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 银行名称 = {
  title: '银行名称',
  dataIndex: 'bankName',
};
const 车辆价格 = {
  title: '车辆金额(元)',
  dataIndex: 'newprice',
};
const 所在位置 = {
  title: '所在位置',
  dataIndex: 'destLocation',
};
const 车架号 = {
  title: '车架号',
  dataIndex: 'chassis',
};
const 还款时间 = {
  title: '还款时间',
  dataIndex: 'businessdate',
};
const 业务类型 = {
  title: '业务类型',
  dataIndex: 'busissnessTypeName',
};
const 实际回款 = {
  title: '实际回款',
  dataIndex: 'poolacctvalue',
};
const 出厂时间 = {
  title: '出厂时间',
  dataIndex: 'factoryTime',
};
const 导入方式 = {
  title: '导入方式',
  dataIndex: 'dataSource',
  render: (text) => {
    if (text == 'sync') {
      return '数据同步';
    } else if (text == 'manual') {
      return '手动导入';
    } else if (text == 'sync_cyt') {
      return '车银通对接';
    }
  },
};
const carSerial = {
  title: '品牌',
  dataIndex: 'carSerial',
};
const carModel = {
  title: '车系',
  dataIndex: 'carModel',
};
const carTrim = {
  title: '车型',
  dataIndex: 'carTrim',
};
const 银行车架号 = {
  title: '银行车架号',
  dataIndex: 'chassisBank',
};
const 车辆性质 = {
  title: '车辆性质',
  dataIndex: 'carType',
};

export const chengColumns = [
  银行,
  经销商名称,
  银行车架号,
  全底盘号,
  carSerial,
  carModel,
  carTrim,
  supplyChain,
  商品名称,
  车辆价格,
  发车日期,
  车辆性质,
  所在位置,
  状态,
  最后处理时间,
  导入方式,
  备注,
];
export const returnColumns = [银行名称, 车架号, tradername, 还款时间, 业务类型, custname, 实际回款, 状态, 最后处理时间, 备注];
export const 数据同步经销商 = [
  { title: '经销商名称 ', dataIndex: 'custname' },
  { title: '银行客户代码', dataIndex: 'bankcustid' },
  { title: '分行名称', dataIndex: 'bankname' },
  { title: '银行分行号', dataIndex: 'bankno' },
  { title: '额度合同开始日期', dataIndex: 'begindate' },
  { title: '授信币种', dataIndex: 'ccycode' },
  { title: '核心企业证件号 ', dataIndex: 'corecustid' },
  { title: '核心企业名称 ', dataIndex: 'corecustname' },
  { title: '仓库名称', dataIndex: 'storename' },
  { title: '仓库代码', dataIndex: 'storenumber' },
  { title: '创建时间 ', dataIndex: 'createtime' },
  { title: '额度协议文本号 ', dataIndex: 'credipapernumber' },
  { title: '额度号 ', dataIndex: 'creditnumber' },
  { title: '额度合同结束日期 ', dataIndex: 'enddate' },
  { title: '监管公司名称 ', dataIndex: 'guardname' },
  { title: '监管简称', dataIndex: 'regulator' },
  { title: '监管公司证件号 ', dataIndex: 'guardnumber' },
  { title: '证件号码  ', dataIndex: 'idcard' },
  { title: '证件类型 ', dataIndex: 'idtype' },
  { title: '操作类型 ', dataIndex: 'opertype' },
  { title: '操作名称 ', dataIndex: 'opertypeName' },
  { title: '总额度 ', dataIndex: 'sumcreditamount' },
  { title: '总敞口 ', dataIndex: 'sumexposureamount' },
  { title: '实时总敞口', dataIndex: 'availexportamt' },
  { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
  { title: '备注', dataIndex: 'remark' },
];
export const 数据同步经销商出账 = [
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '分账号', dataIndex: 'bailaccno' },
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '核心企业名称', dataIndex: 'corecustname' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '客户代码 ', dataIndex: 'custno' },
  { title: '敞口金额 ', dataIndex: 'exportamt' },
  { title: '实时敞口金额 ', dataIndex: 'availexportamt' },
  { title: '业务品种 ', dataIndex: 'finclassname' },
  { title: '业务代码 ', dataIndex: 'finclassno' },
  { title: '初始保证金利率 ', dataIndex: 'firstbailrate' },
  { title: '初始保证金比例 ', dataIndex: 'firstbailratio' },
  { title: '初始保证金 ', dataIndex: 'firstbailtamt' },
  { title: '贷款利率 ', dataIndex: 'loanrate' },
  { title: '产品种类 ', dataIndex: 'prdcode' },
  { title: '出账金额 ', dataIndex: 'putoutamt' },
  {
    title: '融资模式 ',
    dataIndex: 'singlepool',
    render: (text) => {
      if (text == 'S') {
        return '单笔';
      } else if (text == 'P') {
        return '池';
      }
    },
  },
  { title: '贸易商名称 ', dataIndex: 'tradername' },
  { title: '票号', dataIndex: 'billloanno' },
  { title: '是否结清', dataIndex: 'settlementStr' },
  { title: '结清日期', dataIndex: 'settlementtime' },
  { title: '起始日期', dataIndex: 'startdate' },
  { title: '到期日', dataIndex: 'enddate' },
  { title: '借款金额', dataIndex: 'paperamount' },
  { title: '币种', dataIndex: 'paperccycode' },
  { title: '处理状态', dataIndex: 'status', render: (text) => (text == '1' ? '已处理' : '待处理') },
  { title: '备注', dataIndex: 'remark' },
];
