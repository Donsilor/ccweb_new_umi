import { defineConfig } from 'umi';
import routers from '../src/routers';

export default defineConfig({
  title: '易查库后台系统',
  hash: true,
  base: '/ccweb_umi/',
  publicPath: process.env.NODE_ENV === 'production' ? '/ccweb_umi/' : '/',
  mfsu: {},
  proxy: {
    // '/api/warning/': {
    //   target: 'http://uat.e-chaku.com/',
    //   changeOrigin: false,
    //   pathRewrite: { '^/api/warning/': '/warning/' },
    // },
    '/api': {
      target: 'http://sit.e-chaku.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/self-car': {
      target: 'http://uat.e-chaku.com/',
      changeOrigin: true,
    },
    '/warning': {
      target: 'http://uat.e-chaku.com/',
      changeOrigin: true,
    },
  },
  routes: [
    { path: '/login', component: '@/pages/Login', exact: true },
    {
      path: '/',
      component: '@/layouts/index',
      routes: routers,
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': '#1da02b',
  },
});
