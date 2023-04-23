export default [
  {
    path: '/daoqiFCZ',
    component: '@/pages/StatementFCZ/DQbill',
  },
  {
    path: '/carCollectFCZ',
    component: '@/pages/StatementFCZ/CarCollect',
  },
  ...[
    {
      path: '/salesVolumeFCZ',
      redirect: '/salesVolumeFCZ/dealer',
      name: '经销商销量/回款统计表(同步)',
    },
    {
      path: '/salesVolumeFCZ/dealer',
      component: '@/pages/StatementFCZ/SalesVolume/dealer',
      tabName: '经销商+品牌+供应链',
    },
    {
      path: '/salesVolumeFCZ/brand',
      component: '@/pages/StatementFCZ/SalesVolume/brand',
      tabName: '品牌情况表',
    },
    {
      path: '/salesVolumeFCZ/supplyChain',
      component: '@/pages/StatementFCZ/SalesVolume/supplyChain',
      tabName: '品牌+供应链情况表',
    },
    {
      path: '/salesVolumeFCZ/exception',
      component: '@/pages/StatementFCZ/SalesVolume/exception',
      tabName: '异常数据',
    },
  ],
  ...[
    {
      path: '/salesVolumeFCZ_DR',
      redirect: '/salesVolumeFCZ_DR/dealer',
      name: '经销商销量/回款统计表(导入)',
    },
    {
      path: '/salesVolumeFCZ_DR/dealer',
      component: '@/pages/StatementFCZ/SalesVolume/dealer',
      tabName: '经销商+品牌+供应链',
    },
    {
      path: '/salesVolumeFCZ_DR/brand',
      component: '@/pages/StatementFCZ/SalesVolume/brand',
      tabName: '品牌情况表',
    },
    {
      path: '/salesVolumeFCZ_DR/supplyChain',
      component: '@/pages/StatementFCZ/SalesVolume/supplyChain',
      tabName: '品牌+供应链情况表',
    },
    {
      path: '/salesVolumeFCZ_DR/exception',
      component: '@/pages/StatementFCZ/SalesVolume/exception',
      tabName: '异常数据',
    },
  ],
  {
    path: '/collectFCZ_sync',
    component: '@/pages/StatementFCZ/CarCollect_sync',
    name: '车辆汇总表(同步)',
  },
  {
    path: '/ledgerFCZ_sync',
    component: '@/pages/StatementFCZ/LedgerFCZ_sync',
    name: '台账下载(同步)',
  },
  ...[
    {
      path: '/vehicleTracking',
      redirect: '/vehicleTracking/car',
      name: '车辆实际情况',
    },
    {
      path: '/vehicleTracking/car',
      component: '@/pages/StatementFCZ/VehicleStatusTracking/carList',
      tabName: '选择车辆',
    },
    {
      path: '/vehicleTracking/all',
      component: '@/pages/StatementFCZ/VehicleStatusTracking/allList',
      tabName: '全部',
    },
    {
      path: '/vehicleTracking/tracking',
      component: '@/pages/StatementFCZ/VehicleStatusTracking/trackingList',
      tabName: '需跟踪还款',
    },
    {
      path: '/vehicleTracking/improt',
      component: '@/pages/StatementFCZ/VehicleStatusTracking/importArea',
      name: '导入数据',
    },
  ],
];
