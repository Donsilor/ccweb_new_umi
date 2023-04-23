export default [
  {
    path: '/brandModel',
    redirect: '/brandModel/index',
    name: '品牌与车型库',
  },
  {
    path: '/brandModel/index',
    component: '@/pages/SystemManagement/BrandModels',
    tabName: '品牌管理',
  },
  {
    path: '/brandModel/more',
    component: '@/pages/SystemManagement/BrandModels/more',
    tabName: '多品牌录入规则',
  },
];
