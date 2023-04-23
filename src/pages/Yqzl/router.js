export default [
  ...[
    {
      path: '/CarAction_Dis',
      redirect: '/CarAction_Dis/carTodo',
      exact: true,
      name: '车辆明细上报',
    },
    {
      path: '/CarAction_Dis/carTodo',
      component: '@/pages/Yqzl/CarAction/todo',
      exact: true,
      tabName: '车辆明细上报',
    },
    {
      path: '/CarAction_Dis/carList',
      component: '@/pages/Yqzl/CarAction/list',
      exact: true,
      tabName: '发车明细',
    },
  ],
  ...[
    {
      path: '/carChengType',
      redirect: '/carChengType/upload',
      exact: true,
      name: '车辆导入',
    },
    {
      path: '/carChengType/upload',
      component: '@/pages/Yqzl/CarCheng/upload',
      exact: true,
      tabName: '导入',
    },
    {
      path: '/carChengType/list',
      component: '@/pages/Yqzl/CarCheng/list',
      exact: true,
      tabName: '导入记录',
    },
    {
      path: '/carChengType/detail/:id',
      component: '@/pages/Yqzl/CarCheng/detail',
      exact: true,
      name: '查看详情',
    },
  ],
  ...[
    {
      path: '/carReturnType',
      redirect: '/carReturnType/upload',
      exact: true,
      name: '车辆赎回',
    },
    {
      path: '/carReturnType/upload',
      component: '@/pages/Yqzl/CarReturn/upload',
      exact: true,
      tabName: '导入',
    },
    {
      path: '/carReturnType/list',
      component: '@/pages/Yqzl/CarReturn/list',
      exact: true,
      tabName: '导入记录',
    },
    {
      path: '/carReturnType/detail/:id',
      component: '@/pages/Yqzl/CarReturn/detail',
      exact: true,
      name: '查看详情',
    },
  ],
  ...[
    {
      path: '/carSync',
      redirect: '/carSync/carSend',
      exact: true,
      name: '数据同步',
    },
    {
      path: '/carSync/carSend',
      component: '@/pages/Yqzl/CarSync/carSend',
      exact: true,
      tabName: '车辆明细',
    },
    {
      path: '/carSync/carIn',
      component: '@/pages/Yqzl/CarSync/carIn',
      exact: true,
      tabName: '车辆入库',
    },
    {
      path: '/carSync/carOut',
      component: '@/pages/Yqzl/CarSync/carOut',
      exact: true,
      tabName: '赎车明细',
    },
    {
      path: '/carSync/carReturn',
      component: '@/pages/Yqzl/CarSync/carReturn',
      exact: true,
      tabName: '退货明细',
    },
    {
      path: '/carSync/carDis',
      component: '@/pages/Yqzl/CarSync/carDis',
      exact: true,
      tabName: '经销商列表',
    },
    {
      path: '/carSync/disAccounting',
      component: '@/pages/Yqzl/CarSync/disAccounting',
      exact: true,
      tabName: '经销商出账信息',
    },
    {
      path: '/carSync/disExposure',
      component: '@/pages/Yqzl/CarSync/disExposure',
      exact: true,
      tabName: '单笔业务敞口更新',
    },
    {
      path: '/carSync/disSettlement',
      component: '@/pages/Yqzl/CarSync/disSettlement',
      exact: true,
      tabName: '单笔业务到期结清',
    },
    {
      path: '/carSync/trader',
      component: '@/pages/Yqzl/CarSync/trader',
      exact: true,
      tabName: '经销商贸易商列表',
    },
    {
      path: '/carSync/lackDistributor',
      component: '@/pages/Yqzl/CarSync/lackDistributor',
      exact: true,
      tabName: '未同步经销商',
    },
  ],
  ...[
    {
      path: '/carAccount',
      redirect: '/carAccount/accList',
      exact: true,
      name: '车辆明细对账',
    },
    {
      path: '/carAccount/accList',
      component: '@/pages/Yqzl/CarAccount/accList',
      exact: true,
      tabName: '发送明细',
    },
    {
      path: '/carAccount/accList/:id',
      component: '@/pages/Yqzl/CarAccount/detail',
      exact: true,
      name: '查看',
    },
    {
      path: '/carAccount/emailList',
      component: '@/pages/Yqzl/CarAccount/emailList',
      exact: true,
      tabName: '邮箱维护',
    },
  ],
  {
    path: '/hxInvoice',
    component: '@/pages/Yqzl/HxInvoice',
    exact: true,
    name: '航信对接数据',
  },
];
