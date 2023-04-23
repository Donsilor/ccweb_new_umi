import { httpCommonClient, httpFormClient, httpBlobClient, httpBufferClient } from '@/utils/axios';
import EBDic from '@/utils/constant';
import { translate, translatePureDic, formatTime, formatDate } from '@/utils';
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '@/styles/global.less';

moment.locale('zh-cn');

document.getElementById('spinner').hidden = true;
window.message = message;
window.EBDic = EBDic;
window.translate = translate;
window.translatePureDic = translatePureDic;
window.formatTime = formatTime;
window.formatDate = formatDate;
window.httpCommonClient = httpCommonClient;
window.httpFormClient = httpFormClient;
window.httpBlobClient = httpBlobClient;
window.httpBufferClient = httpBufferClient;
