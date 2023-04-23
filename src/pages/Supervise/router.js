export default [
  {
    path: '/importView',
    name: '库存明细导入',
    component: '@/pages/Supervise/ImportView',
    exact: true,
  },
  {
    path: '/superviseManager',
    name: '抽查管理',
    component: '@/pages/Supervise/SuperviseManager',
    exact: true,
  },
  {
    path: '/superviseAmount',
    name: '抽查记录统计',
    component: '@/pages/Supervise/SuperviseAmount',
    exact: true,
  },
  {
    path: '/superviseCompany',
    name: '监管公司',
    component: '@/pages/Supervise/SuperviseCompany',
    exact: true,
  },
  {
    path: '/specialDealer',
    name: '特殊抽查名单',
    component: '@/pages/Supervise/SpecialDealer',
    exact: true,
  },
  {
    path: '/superviseParam',
    name: '参数设置',
    component: '@/pages/Supervise/SuperviseParam',
    exact: true,
  },
];
