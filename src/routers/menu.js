const menus = [
  {
    name: '系统管理',
    subMenu: [
      {
        name: '品牌与车型库',
        link: 'brandModel',
      },
    ],
  },
  {
    name: '银企直联',
    subMenu: [
      {
        name: '车辆导入',
        link: 'carChengType',
      },
      {
        name: '车辆赎回',
        link: 'carReturnType',
      },
      {
        name: '车辆明细上报',
        link: 'CarAction_Dis',
      },
      {
        name: '数据同步',
        link: 'carSync',
      },
      {
        name: '车辆明细对账',
        link: 'carAccount',
      },
    ],
  },
  {
    name: '保证金管理',
    subMenu: [
      {
        name: '转入审批表',
        link: 'transferIn',
      },
      {
        name: '转出审批表',
        link: 'transferOut',
      },
      {
        name: '保证金打印管理',
        link: 'printManagement',
      },
      {
        name: '确认回执列表',
        link: 'confirmReceiptList',
      },
    ],
  },
  {
    name: '二网销售确认',
    subMenu: [
      {
        name: '二网销售列表',
        link: 'marketList',
      },
      {
        name: '二网销售初审',
        link: 'marketFirst',
      },
      {
        name: '二网销售复审',
        link: 'marketRecheck',
      },
      {
        name: '待发放奖励审核',
        link: 'marketAwardCheck',
      },
      {
        name: '奖励金打款',
        link: 'marketAwardRemit',
      },
    ],
  },
  {
    name: '监管公司抽查管理',
    subMenu: [
      {
        name: '库存明细导入',
        link: 'importView',
      },
      {
        name: '抽查管理',
        link: 'superviseManager',
      },
      {
        name: '抽查记录统计',
        link: 'superviseAmount',
      },
      {
        name: '监管公司',
        link: 'superviseCompany',
      },
      {
        name: '特殊抽查名单',
        link: 'specialDealer',
      },
      {
        name: '参数设置',
        link: 'superviseParam',
      },
    ],
  },
  {
    name: '二库视频监控',
    subMenu: [
      {
        name: '库存车监控',
        link: 'repositoryList',
      },
      {
        name: '库存数量预警',
        link: 'repositoryWarning',
      },
    ],
  },
  {
    name: '台账管理',
    subMenu: [
      {
        name: '发票对接数据',
        link: 'hxInvoice',
      },
    ],
  },
  {
    name: '放车组报表',
    subMenu: [
      {
        name: '车辆汇总表',
        link: 'carCollectFCZ',
      },
      {
        name: '到期票提示',
        link: 'daoqiFCZ',
      },
      {
        name: '销量/回款统计(同步)',
        link: 'salesVolumeFCZ',
      },
      {
        name: '销量/回款统计(导入)',
        link: 'salesVolumeFCZ_DR',
      },
      {
        name: '车辆汇总表(同步)',
        link: 'collectFCZ_sync',
      },
      {
        name: '台账下载(同步)',
        link: 'ledgerFCZ_sync',
      },
      {
        name: '车辆实际情况',
        link: 'vehicleTracking',
      },
    ],
  },
  {
    name: '车辆推送橙E',
    subMenu: [
      {
        name: '推送车辆导入',
        link: 'pushMatchUpload',
      },
      {
        name: '车辆推送明细',
        link: 'pushMatchList',
      },
    ],
  },
];

export default menus;
