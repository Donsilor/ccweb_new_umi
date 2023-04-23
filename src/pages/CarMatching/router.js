export default [
  {
    path: '/pushMatchUpload',
    component: '@/pages/CarMatching/UploadMatch/view',
    exact: true,
    name: '推送车辆导入',
  },
  {
    path: '/pushMatchList',
    component: '@/pages/CarMatching/collectMatch',
    exact: true,
    name: '车辆推送明细',
  },
];
