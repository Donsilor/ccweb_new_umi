// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '/Users/yeqixu/Desktop/ccweb_new_umi/src/app.js';
import * as Plugin_1 from '/Users/yeqixu/Desktop/ccweb_new_umi/src/.umi/plugin-dva/runtime.tsx';
import * as Plugin_2 from '../plugin-initial-state/runtime';
import * as Plugin_3 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: '/Users/yeqixu/Desktop/ccweb_new_umi/src/app.js',
  });
  plugin.register({
    apply: Plugin_1,
    path: '/Users/yeqixu/Desktop/ccweb_new_umi/src/.umi/plugin-dva/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_3,
    path: '../plugin-model/runtime',
  });

export const __mfsu = 1;
