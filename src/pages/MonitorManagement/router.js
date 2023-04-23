export default [
  {
    path: '/repositoryList',
    redirect: '/repositoryList/list',
    exact: true,
  },
  {
    path: '/repositoryList/list',
    component: '@/pages/MonitorManagement/RepositoryList',
    exact: true,
  },
  {
    path: '/repositoryList/detail',
    component: '@/pages/MonitorManagement/RepositoryList/RepositoryDetail',
    exact: true,
    name: '影像明细',
  },
  {
    path: '/repositoryWarning',
    redirect: '/repositoryWarning/todo',
    exact: true,
  },
  {
    path: '/repositoryWarning/todo',
    component: '@/pages/MonitorManagement/RepositoryWarning/TodoPage',
    exact: true,
    tabName: '未解除',
  },
  {
    path: '/repositoryWarning/gone',
    component: '@/pages/MonitorManagement/RepositoryWarning/GonePage',
    exact: true,
    tabName: '已解除',
  },
];
