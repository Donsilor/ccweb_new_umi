export default [
  {
    path: '/transferIn',
    component: '@/pages/BondManagement/TransferIn',
  },
  {
    path: '/transferOut',
    component: '@/pages/BondManagement/TransferOut',
  },
  {
    path: '/printManagement',
    component: '@/pages/BondManagement/PrintManagement',
  },
  {
    path: '/confirmReceiptList',
    redirect: '/confirmReceiptList/todo',
    exact: true,
  },
  {
    path: '/confirmReceiptList/todo',
    component: '@/pages/BondManagement/ConfirmReceipt/TabTodoCom',
    exact: true,
    tabName: '待确认回执',
  },
  {
    path: '/confirmReceiptList/all',
    component: '@/pages/BondManagement/ConfirmReceipt/TabAllCom',
    exact: true,
    tabName: '全部任务',
  },
  {
    path: '/confirmReceiptList/ewDetail',
    component: '@/pages/BondManagement/ConfirmReceipt/EwDetail',
    exact: true,
    name: '保证金详情',
  },
];
